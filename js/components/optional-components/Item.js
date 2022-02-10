export default {
  props: {
    result: Object,
    logoLocationUrl: String,
  },
  data: function () {
    return {
      fullClassName: this.result.item.fullClassName,
      showFullDesc: false
    }
  },
  beforeUpdate: function () {
    // Not the same result
    if (this.fullClassName != this.result.item.fullClassName) {
      this.showFullDesc = false;
    }
    this.fullClassName = this.result.item.fullClassName;
  },
  computed: {
    groupId: function () {
      return this.result.item.groupId;
    },
    artifactId: function () {
      return this.result.item.artifactId;
    },
    name: function () {
      return this.result.item.name ? this.result.item.name.replace("/", " / ") : this.result.item.name;
    },
    description: function () {
      return this.result.item.description || "";
    },
    target: function () {
      return this.result.item.target ? this.result.item.target : "";
    },
    license: function () {
      return this.result.item.license && this.result.item.license != "false";
    },
    tags: function () {
      return this.result.item.tags ? this.result.item.tags.split(",") : [];

    },
    logo: function () {
      return `${this.logoLocationUrl}/${this.artifactId}.png`;
    }
  },
  methods: {
    toggleFullDesc: function () {
      this.showFullDesc = !this.showFullDesc;
    },
    setDefaultLogo: function (event) {
      event.target.src = "./img/optional-components/default.png";
    },
    emitSelectItem: function (selectedItem) {
      this.$emit("select-item", selectedItem);
    },
    selectItem: function () {
      this.emitSelectItem(this.result.item);
    }
  },
  template: /*html*/ `
      <div class="col">
        <div class="card h-100 card-optional-component">
          <img v-bind:src="logo" v-on:error="setDefaultLogo" class="card-img-top" v-bind:alt="artifactId" width="80" height="80">
          <div class="card-body">
            <h5 class="card-title">
              {{ name }}
              <small class="text-muted" v-show="target">(Target&nbsp;{{ target }})</small>
            </h5>
            <p class="card-text mb-2">
              <code>{{ groupId + ':' + artifactId }}</code>
            </p>
            <p class="card-text mb-2">
              <span class="text-muted" v-text="description"></span>&nbsp;
            </p>
            <p class="card-text mb-2" v-if="result.item.version">
              <small class="text-info">{{ result.item.version }}</small>
            </p>
            <p class="card-text" v-if="tags && tags.length > 0">
              <span v-for="tag in tags"><span class="badge bg-info" v-bind:class="['badge-' + tag]">{{ tag }}</span>&nbsp;</span>
            </p>
          </div>
          <div class="card-footer bg-transparent">
            <div class="d-grid gap-2 d-md-flex justify-content-md-between">
              <button v-on:click="selectItem" class="btn btn-outline-primary">
                View
              </button>
              <span v-if="license" class="text-warning lh-lg">
                <i class="fa fa-fw fa-credit-card" title="This optional component requires an Interlok License"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    `
};