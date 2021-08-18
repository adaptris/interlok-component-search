import adpLink from "../link-module.js"

export default {
    props: {
        versions: Array,
        dataLocation: String,
        hideHeaderFooter: Boolean,
        hideOcs: Boolean
    },
    data: function () {
        return {
            adaptrisLink: adpLink.adpBase,
            hasResult: false
        };
    },
    methods: {
        hasResultReceived: function (value) {
            this.hasResult = value;
        }
    },
    template: /*html*/ `
        <div class="interlok-search">
            <header class="mb-4 sticky-top" v-if="!hideHeaderFooter">
                <nav class="navbar navbar-expand-lg navbar-light bg-light search-bar">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">
                            <img src="./img/logo.png" width="30" height="30" class="d-inline-block align-text-top" alt="Interlok Logo">
                            <span> Interlok Component Search</span>
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <router-link class="nav-link" to="/component-search" active-class="active" exact-path>
                                        Component Search
                                    </router-link>
                                </li>
                                <li class="nav-item" v-if="!hideOcs">
                                    <router-link class="nav-link" to="/optional-component-search" active-class="active" exact-path>
                                        Optional Component
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <section id="main" class="mb-4">
                <router-view v-on:has-result-received="hasResultReceived" v-bind:versions="versions" v-bind:data-location="dataLocation" v-bind:has-header="!hideHeaderFooter"></router-view>
            </section>
        
            <footer class="" v-bind:class="{'fixed-bottom': !hasResult}" v-if="!hideHeaderFooter">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a target="_new" v-bind:href="adaptrisLink.adpBase">
                    &copy;&nbsp;Adaptris Limited <span class="copyright-date"></span>
                    </a>
                </div>
                </nav>
            </footer>
        </div>
    `
};