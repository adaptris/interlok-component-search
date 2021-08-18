import adpUtils from "../utils-module.js"
import ComponentSearchResults from './interlok-components/SearchResults.js';

const searchWorker = new Worker("./js/workers/component-json-search-worker.js");

export default {
    components: {
        "component-search-results": ComponentSearchResults
    },
    props: {
        versions: Array,
        dataLocation: String,
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
            searchInstances: false,
            originalSelected: 0,
            from: 0,
            size: 10,
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
        paginatedResults: function () {
            return this.results ? this.results.slice(this.from, this.from + this.size) : [];
        },
        placeholder: function () {
            return this.searchInstances ? "ClassName:Query" : "Query";
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

            searchWorker.postMessage({ q: self.query, v: self.version, type: "components", jsonFileURL: `${self.dataLocation}/interlok-component-${self.version.toLowerCase()}.json` });
        },
        doSearchInstances: function () {
            var self = this;
            self.loading = true;
            self.searchMessage = "Searching components...";

            const searchWorker = self.getOrInitWorker();

            const queryParts = adpUtils.trimToEmpty(self.query).split(":");
            const subQuery = queryParts.length > 1 ? queryParts[1] : "";

            const query = {
                $and: [
                    { parents: adpUtils.addPrefix(queryParts[0], "=") }
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

            searchWorker.postMessage({ q: query, v: self.version, type: "instances", jsonFileURL: `../../data/interlok-component-${self.version.toLowerCase()}.json` });
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
    },
    template: /*html*/ `
        <div class="component-search">
            <div class="toast-container position-absolute p-3 end-0" id="toastPlacement" v-bind:class="{'top-0': hasHeader, 'no-header': !hasHeader}" style="z-index: 9999">
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
                                        <div class="form-check-inline form-check form-switch">
                                            <input class="form-check-input" type="checkbox" id="searchInstances" v-model="searchInstances">
                                            <label class="form-check-label" for="searchInstances">Instances</label>
                                        </div>
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
                            <component-search-results v-bind:results="paginatedResults" v-bind:total="total"
                                v-bind:original-selected="originalSelected" v-on:paginate="searchPaginate">
                            </component-search-results>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};