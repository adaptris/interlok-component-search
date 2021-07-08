import adp from "./global.js"
import ComponentSearch from "./components/ComponentSearch.js"
import OptionalComponentSearch from "./components/OptionalComponentSearch.js"

// Config
const VERSIONS = ["4.1.0-RELEASE", "4.0.0-RELEASE"];
const LOGO_LOCATION_URL = "https://github.com/sebastien-belin-adp/interlok-optional-component-logos/raw/main/img";

const ComponentSearchPage = {
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
    hasResultReceived(hasResult) {
      this.$emit("hasResultReceived", hasResult);
    }
  },
  template: `<component-search id="component-search" v-bind:versions="versions" v-on:has-result="hasResultReceived"></component-search>`
};
const OptionalComponentSearchPage = {
  components: {
    "optional-component-search": OptionalComponentSearch
  },
  data: function () {
    return {
      versions: VERSIONS,
      logoLocationUrl: LOGO_LOCATION_URL,
      hasResult: false
    };
  },
  methods: {
    hasResultReceived(hasResult) {
      this.$emit("hasResultReceived", hasResult);
    }
  },
  template: `<optional-component-search id="component-search" v-bind:versions="versions" v-bind:logo-location-url="logoLocationUrl" v-on:has-result="hasResultReceived"></optional-component-search>`
};
const NotFound = {
  template: `<h2>Oops, it looks like the page you're looking for doesn't exist.</h2>`
};

const routes = [
  { path: "/", redirect: "/component-search" },
  { path: "/component-search", component: ComponentSearchPage },
  { path: "/optional-component-search", component: OptionalComponentSearchPage },
  { path: "/:catchAll(.*)", component: NotFound }
];

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
});

const app = Vue.createApp({
  inject: ["adp"],
  data: function () {
    return {
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

app.use(router);

app.mount('#app');
