import OptionalComponentItem from './OptionalComponentItem.js';

export default {
  components: {
    "optional-component-item": OptionalComponentItem
  },
  props: {
    logoLocationUrl: String,
    total: Number,
    results: Array,
  },
  computed: {
    hasResult: function () {
      return this.results && this.results.length > 0;
    }
  },
  template: /*html*/ `
      <div>
        <div class=" mb-2 text-muted" v-show="hasResult">
          <span v-text="total"></span> Results
        </div>
        <div class="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-4">
          <optional-component-item v-for="result in results" v-bind:result="result" v-bind:key="result.artifactId" v-bind:logo-location-url="logoLocationUrl"></optional-component-item>
        </div>
      </div>
    `
};