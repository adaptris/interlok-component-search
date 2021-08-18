import OptionalComponentList from './optional-components/ItemList.js';

const searchWorker = new Worker("./js/workers/optional-component-json-search-worker.js");

export default {
    components: {
        "optional-component-list": OptionalComponentList
    },
    props: {
        versions: Array,
        logoLocationUrl: String,
        hasHeader: Boolean
    },
    data: function () {
        return {
            searchWorker: null,
            errors: {},
            searchMessage: null,
            loading: false,
            query: null,
            version: this.versions[0],
            total: 0,
            results: []
        };
    },
    created: function () {
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed: function () {
        window.removeEventListener("scroll", this.handleScroll);
    },
    computed: {
        hasResult: function () {
            return this.results && this.results.length > 0;
        },
        placeholder: function () {
            return "Query";
        }
    },
    watch: {
        results: function (results) {
            this.emitHasResult(this.hasResult);
        }
    },
    methods: {
        handleScroll(event) {
            const navbarContainer = document.getElementById("navbar-container");
            if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
                navbarContainer.classList.add("sticky-top");
                navbarContainer.classList.remove("container");
            } else {
                navbarContainer.classList.add("container");
                navbarContainer.classList.remove("sticky-top");
            }
        },
        emitHasResult: function (hasResult) {
            this.$emit("has-result", hasResult);
        },
        getOrInitWorker: function () {
            var self = this;
            if (!self.searchWorker) {
                searchWorker.onmessage = function (e) {
                    const resultsJson = e.data ? e.data.results : {};
                    console.log("Message received from worker");
                    self.total = resultsJson.totalCount;
                    self.results = resultsJson.optionalComponents;
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
        doSearchOptionalComponents: function () {
            var self = this;
            self.loading = true;
            self.searchMessage = "Searching components...";

            const searchWorker = self.getOrInitWorker();

            searchWorker.postMessage({ q: self.query, v: self.version, jsonFileURL: `../../data/interlok-optional-component-${self.version.toLowerCase()}.json` });
        },
        search: function (event) {
            event.preventDefault();
            if (this.validate(event)) {
                this.doSearch();
            }
        },
        doSearch: function () {
            this.doSearchOptionalComponents();
        },
        validate: function (event) {
            this.searchMessage = null;
            this.errors = {};
            if (/*this.query &&*/ this.version) {
                return true;
            }
            /*if (!this.query) {
                this.errors["query"] = "Query required.";
            }*/
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
    },
    mounted: function () {
        this.doSearch();
    },
    template: /*html*/ `
        <div class="optional-component-search">
            <div class="toast-container position-absolute p-3 top-0 end-0" id="toastPlacement" style="z-index: 9999">
            <div class="toast align-items-center text-white bg-error border-0" v-bind:class="{'show': hasError('global')}"
                role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex" v-show="hasError('global')">
                <div class="toast-body">
                    <div class="text-danger" v-if="hasError('global')" v-text="getError('global')"></div>
                </div>
                <!-- <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button> -->
                </div>
            </div>
            </div>
            <div class="container mb-4" v-bind:class="{'has-header': hasHeader}" id="navbar-container">
                <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
                    <div class="container">
                        <div class="col align-self-center">
                            <form v-on:submit="search" method="post">
                                <div class="form-group row">
                                    <div class="col-sm-7">
                                        <input type="search" class="form-control" v-model="query"
                                            v-bind:class="{'is-invalid': hasError('query')}" id="query" v-bind:placeholder="placeholder">
                                        <div class="invalid-feedback" v-if="hasError('query')" v-text="getError('query')"></div>
                                    </div>
                                    <div class="col-sm-2">
                                        <select class="form-select" aria-label="Version" v-model="version"
                                            v-bind:class="{'is-invalid': hasError('version')}" id="version">
                                            <option v-for="ver in versions" v-bind:value="ver">
                                            {{ver}}
                                            </option>
                                        </select>
                                        <div class="invalid-feedback" v-if="hasError('version')" v-text="getError('version')"></div>
                                    </div>
                                    <div class="col-sm-3">
                                        <button type="submit" class="btn btn-primary btn-block" v-bind:disabled="loading">
                                            <i v-show="!loading" class="fa fa-search"></i>
                                            <i v-show="loading" class="fa fa-spinner fa-spin"></i>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="container">
                <div class="row justify-content-md-center mb-4">
                    <div class="col align-self-center">
                        <div style="position: relative; min-height: 50px">
                            <div class="loading-overlay" v-show="loading">
                                <div class="loading-overlay-inner">
                                    <div class="text-muted" v-if="searchMessage" v-text="searchMessage"></div>
                                    <i class="fa fa-spinner fa-spin"></i>
                                </div>
                            </div>
                            <optional-component-list v-bind:logo-location-url="logoLocationUrl" v-bind:results="results" v-bind:total="total">
                            </optional-component-list>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};