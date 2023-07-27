import OptionalComponentItemCard from './ItemCard.js';
import OptionalComponentItemRow from './ItemRow.js';
import ItemDetails from './ItemDetails.js';
import GenerateBuildGradle from './GenerateBuildGradle.js';

export default {
  components: {
    "optional-component-item-card": OptionalComponentItemCard,
    "optional-component-item-row": OptionalComponentItemRow,
    "optional-component-item-details": ItemDetails,
    "optional-component-generate-build-gradle": GenerateBuildGradle,
  },
  props: {
    logoLocationUrl: String,
    total: Number,
    results: Array,
    listView: Boolean
  },
  data: function () {
    return {
      selectedItem: null,
      multiSelectedItems: [],
      generateBuildGradleOpened: false,
    }
  },
  computed: {
    hasResult: function () {
      return this.results && this.results.length > 0;
    },
    hasMultiSelectedItem: function () {
      return this.multiSelectedItems && this.multiSelectedItems.length > 0;
    },
    gridView: function () {
      return !this.listView;
    }
  },
  methods: {
    selectItem(selectedItem) {
      this.selectedItem = selectedItem;
    },
    isMultiSelectedItem(item) {
      return this.multiSelectedItems.includes(item)
    },
    multiSelectItem(selectedItem) {
      if (this.isMultiSelectedItem(selectedItem)) {
        this.multiSelectedItems.splice(this.multiSelectedItems.indexOf(selectedItem), 1);
      } else {
        this.multiSelectedItems.push(selectedItem);
      }
    },
    multiSelectItems() {
      this.clearMultiSelectedItems();
      for (let index = 0; index < this.results.length; index++) {
        this.multiSelectItem(this.results[index].item);
      }
    },
    clearMultiSelectedItems() {
      this.multiSelectedItems.length = 0;
    },
    closeModal() {
      this.selectItem(null);
    },
    closeGenerateBuildGradleModal() {
      this.generateBuildGradleOpened = false;
    },
    openGenerateBuildGradle() {
      this.generateBuildGradleOpened = true;
    },
    toggleView() {
      this.$router.push({path: this.$route.fullPath, query: {listView: !this.listView}})
    }
  },
  template: /*html*/ `
      <div>
        <div v-show="hasResult">
          <div class="d-flex align-items-baseline mb-2 text-muted">
            <span v-text="total"></span>&nbsp;Results
            |
            <button v-on:click="multiSelectItems" class="btn btn-link btn-sm">
              Select All
            </button>
            <button v-on:click="clearMultiSelectedItems" class="btn btn-link btn-sm">
              Clear All
            </button>
            <div v-show="hasMultiSelectedItem">
              <div class="d-flex align-items-baseline">
                |
                &nbsp;<span class="d-inline-block" v-text="multiSelectedItems.length"></span>&nbsp;Selected
                |&nbsp;
                <button v-on:click="openGenerateBuildGradle" class="btn btn-outline-primary btn-sm">
                  Generate build.gradle
                </button>
              </div>
            </div>
            &nbsp;
            <router-link v-if="gridView" class="btn btn-outline-primary btn-sm" to="?listView=true">
              <i class="fa fa-fw fa-th-list" title="List view"></i>
            </router-link>
            <router-link v-if="listView" class="btn btn-outline-primary btn-sm" to="?listView=false">
              <i class="fa fa-fw fa-th-large" title="Grid view"></i>
            </router-link>
          </div>
        </div>
        <div v-if="gridView" class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-4">
          <optional-component-item-card v-for="result in results" v-bind:result="result" v-bind:key="result.artifactId" v-bind:logo-location-url="logoLocationUrl" v-on:select-item="selectItem" v-on:multi-select-item="multiSelectItem" v-bind:is-multi-selected="isMultiSelectedItem(result.item)" >
          </optional-component-item-card>
        </div>
        <div v-if="listView" class="list-group list-group-striped g-4">
          <optional-component-item-row v-for="result in results" v-bind:result="result" v-bind:key="result.artifactId" v-bind:logo-location-url="logoLocationUrl" v-on:select-item="selectItem" v-on:multi-select-item="multiSelectItem" v-bind:is-multi-selected="isMultiSelectedItem(result.item)" >
          </optional-component-item-row>
        </div>
        <div v-if="selectedItem" class="modal fade show d-block" tabindex="-1" aria-labelledby="optionalComponentModal" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <optional-component-item-details v-bind:item="selectedItem" v-bind:logo-location-url="logoLocationUrl" v-on:close-modal="closeModal"></optional-component-item-details>
          </div>
        </div>
        <div v-if="selectedItem" class="modal-backdrop fade show"></div>
        <div v-if="generateBuildGradleOpened" class="modal fade show d-block" tabindex="-1" aria-labelledby="generateBuildGradleModal" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <optional-component-generate-build-gradle v-bind:items="multiSelectedItems" v-on:close-modal="closeGenerateBuildGradleModal"></optional-component-generate-build-gradle>
          </div>
        </div>
        <div v-if="generateBuildGradleOpened" class="modal-backdrop fade show"></div>
      </div>
    `
};