import SearchResultsResult from './SearchResultsResult.js';
import SearchResultsPagination from './SearchResultsPagination.js';

export default {
    components: {
        "search-results-result": SearchResultsResult,
        "search-results-pagination": SearchResultsPagination
    },
    props: {
        total: Number,
        results: Array,
        originalSelected: Number
    },
    data: function () {
        return {
            size: 10
        }
    },
    computed: {
        hasResult: function () {
            return this.results && this.results.length > 0;
        }
    },
    methods: {
        paginate: function (msg) {
            this.$emit('paginate', { selected: msg.selected, from: msg.from, size: msg.size });
        }
    },
    template: /*html*/ `
      <div>
        <div class=" mb-2 text-muted" v-show="hasResult">
          <span v-text="total"></span> Results
        </div>
        <ul class="list-unstyled">
         <search-results-result v-for="result in results" v-bind:result="result" v-bind:key="result.fullClassName"></search-results-result>
        </ul>
        <search-results-pagination v-show="hasResult" v-bind:total="total" v-bind:original-selected="originalSelected" v-bind:size="size" v-on:paginate="paginate"></search-results-pagination>
      </div>
    `
};