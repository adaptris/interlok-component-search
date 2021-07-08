import OptionalComponentItem from './Item.js';
import ItemDetails from './ItemDetails.js';

export default {
  components: {
    "optional-component-item": OptionalComponentItem,
    "optional-component-item-details": ItemDetails,
  },
  props: {
    logoLocationUrl: String,
    total: Number,
    results: Array,
  },
  data: function () {
    return {
      selectedItem: null
    }
  },
  computed: {
    hasResult: function () {
      return this.results && this.results.length > 0;
    }
  },
  methods: {
    selectItem(selectedItem) {
      this.selectedItem = selectedItem;
    },
    closeModal() {
      this.selectItem(null);
    }
  },
  template: /*html*/ `
      <div>
        <div class=" mb-2 text-muted" v-show="hasResult">
          <span v-text="total"></span> Results
        </div>
        <div class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-4">
          <optional-component-item v-for="result in results" v-bind:result="result" v-bind:key="result.artifactId" v-bind:logo-location-url="logoLocationUrl" v-on:select-item="selectItem">
          </optional-component-item>
        </div>
        <div v-if="selectedItem" class="modal fade show d-block" tabindex="-1" aria-labelledby="optionalComponentModal" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <optional-component-item-details v-bind:item="selectedItem" v-bind:logo-location-url="logoLocationUrl" v-on:close-modal="closeModal"></optional-component-item-details>
          </div>
        </div>
        <div v-if="selectedItem" class="modal-backdrop fade show"></div>
      </div>
    `
};