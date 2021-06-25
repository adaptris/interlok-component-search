export default {
    props: {
        total: Number,
        size: Number,
        originalSelected: Number
    },
    data: function () {
        return {
            selected: 0,
            limit: 5
        }
    },
    updated: function () {
        if (this.originalSelected !== this.selected) {
            this.selected = 0
        }
    },
    computed: {
        pageCount: function () {
            return Math.ceil(this.total / this.size);
        },
        pages: function () {
            var pages = [];
            for (var i = 0; i < this.pageCount; i++) {
                if (this.selected - this.limit <= i && this.selected + this.limit >= i) {
                    var page = {
                        index: i,
                        content: this.selected - this.limit === i || this.selected + this.limit == i ? '...' : i + 1,
                        selected: i === this.selected
                    }
                    pages.push(page);
                }
            }
            return pages;
        },
        firstPageSelected: function () {
            return this.selected === 0;
        },
        lastPageSelected: function () {
            return this.selected === this.pageCount - 1 || this.pageCount === 0;
        }
    },
    methods: {
        paginate: function () {
            this.$emit('paginate', { selected: this.selected, from: this.selected * this.size, size: this.size });
        },
        setPage: function (page) {
            this.selected = page.index;
            this.paginate();
        },
        firstPage: function () {
            this.selected = 0;
            this.paginate();
        },
        previous: function () {
            this.selected = Math.max(0, this.selected - 1);
            this.paginate();
        },
        next: function () {
            this.selected = this.selected + 1;
            this.paginate();
        },
        lastPage: function () {
            this.selected = this.pageCount - 1;
            this.paginate();
        }
    },
    template: `
      <nav aria-label="...">
        <ul class="pagination">
          <li class="page-item" v-bind:class="[firstPageSelected ? 'disabled' : '']">
            <a class="page-link" href="#" v-on:click="firstPage" v-on:keyup.enter="firstPage" v-bind:tabindex="firstPageSelected ? -1 : 0">First</a>
          </li>
          <li class="page-item" v-bind:class="[firstPageSelected ? 'disabled' : '']">
            <a class="page-link" href="#" v-on:click="previous">Previous</a>
          </li>
          <li class="page-item" v-bind:class="{'active': page.selected}" v-for="page in pages" v-bind:result="page">
            <a class="page-link" href="#" v-on:click="setPage(page)">{{ page.content }}</a>
            <span class="sr-only" v-if="page.selected">(current)</span>
          </li>
          <li class="page-item" v-bind:class="[lastPageSelected ? 'disabled' : '']">
            <a class="page-link" href="#" v-on:click="next">Next</a>
          </li>
          <li class="page-item" v-bind:class="[lastPageSelected ? 'disabled' : '']">
            <a class="page-link" href="#" v-on:click="lastPage" v-on:keyup.enter="lastPage" v-bind:tabindex="lastPageSelected ? -1 : 0">Last</a>
          </li>
        </ul>
      </nav>
    `
};