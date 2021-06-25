import adpGlobal from "./global.js"
import adpUtils from "./utils-module.js"
import SearchResults from "./components/SearchResults.js"

const searchWorker = new Worker("./js/json-search-worker.js");

const versions = ["4.1.0-RELEASE", "4.0.0-RELEASE"];
const app = Vue.createApp({
  inject: ["adp", "adpUtils"],
  components: {
    "search-results": SearchResults
  },
  data: function () {
    return {
      searchWorker: null,
      errors: {},
      searchMessage: null,
      loading: false,
      query: null,
      versions: versions,
      version: versions[0],
      searchInstances: false,
      originalSelected: 0,
      from: 0,
      size: 10,
      total: 0,
      results: []
    };
  },
  computed: {
    hasResult: function () {
      return this.results && this.results.length > 0;
    },
    paginatedResults: function () {
      return this.results ? this.results.slice(this.from, this.from + this.size) : [];
    },
    placeholder: function () {
      return this.searchInstances ? "ClassName:Query" : "Query";
    }
  },
  methods: {
    getOrInitWorker: function () {
      var self = this;
      if (!self.searchWorker) {
        searchWorker.onmessage = function (e) {
          const resultsJson = e.data ? e.data.results : {};
          console.log("Message received from worker");
          self.total = resultsJson.totalCount;
          self.results = resultsJson.components;
          self.loading = false;
        }

        searchWorker.onerror = function (error) {
          self.searchMessage = null;
          self.results = [];
          if (error && error.message) {
            self.errors["global"] = error.message;
          }
          self.loading = false;
        }

        self.searchWorker = searchWorker;
      }
      return self.searchWorker;
    },
    doSearchComponents: function () {
      var self = this;
      self.loading = true;
      self.searchMessage = "Searching components...";

      const searchWorker = self.getOrInitWorker();

      searchWorker.postMessage({ q: self.query, v: self.version, type: "components", jsonFileURL: `../data/interlok-component-${self.version.toLowerCase()}.json` });
    },
    doSearchInstances: function () {
      var self = this;
      self.loading = true;
      self.searchMessage = "Searching components...";

      const searchWorker = self.getOrInitWorker();

      const queryParts = this.adpUtils.trimToEmpty(self.query).split(":");
      const subQuery = queryParts.length > 1 ? queryParts[1] : "";

      const query = {
        $and: [
          { parents: this.adpUtils.addPrefix(queryParts[0], "=") }
        ]
      }

      if (subQuery !== "") {
        query.$and[1] = {
          $or: [
            { fullClassName: subQuery },
            { className: subQuery },
            { packageName: subQuery },
            { alias: subQuery },
            { componentType: subQuery },
            { $path: "profile.tag", $val: subQuery }
          ]
        }
      }

      searchWorker.postMessage({ q: query, v: self.version, type: "instances", jsonFileURL: `../data/interlok-component-${self.version.toLowerCase()}.json` });
    },
    search: function (event) {
      event.preventDefault();
      this.originalSelected = 0;
      this.from = 0;
      if (this.validate(event)) {
        this.doSearch();
      }
    },
    doSearch: function () {
      if (this.searchInstances) {
        this.doSearchInstances();
      } else {
        this.doSearchComponents();
      }
    },
    searchPaginate: function (msg) {
      this.originalSelected = msg.selected;
      this.from = msg.from;
      this.size = msg.size;
      console.log(this.selected, this.from, this.size);
    },
    validate: function (event) {
      this.searchMessage = null;
      this.errors = {};
      if (this.query && this.version) {
        return true;
      }
      if (!this.query) {
        this.errors["query"] = "Query required.";
      }
      if (!this.version) {
        this.errors["version"] = "Version required.";
      }
    },
    getError: function (property) {
      return this.errors[property];
    },
    hasError: function (property) {
      return this.getError(property) != null;
    }
  }
});

// Register adp to the vue app
app.provide("adp", adpGlobal);
app.provide("adpUtils", adpUtils);

app.mount('#app');
