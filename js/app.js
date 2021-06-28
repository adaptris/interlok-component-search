import adp from "./global.js"
import ComponentSearch from "./components/ComponentSearch.js"

const VERSIONS = ["4.1.0-RELEASE", "4.0.0-RELEASE"];

const app = Vue.createApp({
  inject: ["adp"],
  components: {
    "component-search": ComponentSearch
  },
  data: function () {
    return {
      versions: VERSIONS,
      hasResult: false
    };
  },
  methods: {
    hasResultReceived: function (value) {
      this.hasResult = value;
    }
  }
});

// Register adp to the vue app
app.provide("adp", adp);

app.mount('#app');
