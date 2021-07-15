import ItemDetailsGeneral from './ItemDetailsGeneral.js';
import ItemDetailsLinks from './ItemDetailsLinks.js';
import ItemDetailsBuild from './ItemDetailsBuild.js';
import ItemDetailsReadme from './ItemDetailsReadme.js';

export default {
  components: {
    "item-details-general": ItemDetailsGeneral,
    "item-details-links": ItemDetailsLinks,
    "item-details-build": ItemDetailsBuild,
    "item-details-readme": ItemDetailsReadme
  },
  props: {
    item: Object,
    logoLocationUrl: String,
  },
  data: function () {
    return {
      contactUsUrl: "https://www.adaptris.com/contact/",
      selectedTab: "general"
    }
  },
  computed: {
    artifactId: function () {
      return this.item.artifactId;
    },
    name: function () {
      return this.item.name ? this.item.name.replace("/", " / ") : this.item.name;
    },
    logo: function () {
      return `${this.logoLocationUrl}/${this.artifactId}.png`;
    },
    isGeneral: function () {
      return this.selectedTab === "general";
    },
    isLinks: function () {
      return this.selectedTab === "links";
    },
    isBuild: function () {
      return this.selectedTab === "build";
    },
    isReadme: function () {
      return this.selectedTab === "readme";
    }
  },
  methods: {
    toggleFullDesc: function () {
      this.showFullDesc = !this.showFullDesc;
    },
    setDefaultLogo: function (event) {
      event.target.src = "../img/optional-components/default.png";
    },
    selectTab: function (event) {
      this.selectedTab = event.target.dataset.tab;
    },
    emitCloseModal: function (close) {
      this.$emit("close-modal", close);
    },
    close: function () {
      this.emitCloseModal(true);
    }
  },
  template: /*html*/ `
      <div class="modal-content modal-content-optional-component">
        <div class="modal-header">
          <img v-bind:src="logo" v-on:error="setDefaultLogo" class="" v-bind:alt="artifactId" width="70" height="70">&nbsp;&nbsp;
          <h5 class="modal-title">
            {{ name }}
          </h5>
          <button type="button" class="btn-close" aria-label="Close" v-on:click="close"></button>
        </div>
        <div class="modal-tabs">
          <ul class="nav nav-tabs nav-fill w-100">
            <li class="nav-item">
              <button class="nav-link" v-bind:class="{active: isGeneral}" data-tab="general" v-on:click="selectTab">General</button>
            </li>
            <li class="nav-item">
              <button class="nav-link" v-bind:class="{active: isLinks}" data-tab="links" v-on:click="selectTab">Links</button>
            </li>
            <li class="nav-item">
              <button class="nav-link" v-bind:class="{active: isBuild}" data-tab="build" v-on:click="selectTab">Build</button>
            </li>
            <li class="nav-item">
              <button class="nav-link" v-bind:class="{active: isReadme}" data-tab="readme" v-on:click="selectTab">ReadMe</button>
            </li>
          </ul>
        </div>
        <div class="modal-body">
          <div class="tab-content">
            <div class="tab-pane fade" v-bind:class="{active: isGeneral, show: isGeneral}" role="tabpanel" aria-labelledby="general-tab">
              <item-details-general v-bind:item="item" v-bind:logo-location-url="logoLocationUrl"></item-details-general>
            </div>
            <div class="tab-pane fade" v-bind:class="{active: isLinks, show: isLinks}" role="tabpanel" aria-labelledby="links-tab">
              <item-details-links v-bind:item="item" v-bind:contact-us-url="contactUsUrl"></item-details-links>
            </div>
            <div class="tab-pane fade" v-bind:class="{active: isBuild, show: isBuild}" role="tabpanel" aria-labelledby="build-tab">
              <item-details-build v-bind:item="item"></item-details-build>
            </div>
            <div class="tab-pane fade" v-bind:class="{active: isReadme, show: isReadme}" role="tabpanel" aria-labelledby="readme-tab">
              <item-details-readme v-bind:item="item"></item-details-readme>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-danger" aria-label="Close" v-on:click="close">Close</button>
        </div>
      </div>
    `
};