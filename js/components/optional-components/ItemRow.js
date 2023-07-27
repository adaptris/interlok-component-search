export default {
  props: {
    result: Object,
    logoLocationUrl: String,
    isMultiSelected: Boolean
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
    deprecatedText: function () {
      return this.result.item.deprecatedText || "";
    },
    isDeprecated: function () {
      return this.deprecatedText != "";
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
    },
    emitMultiSelectItem: function (selectedItem) {
      this.$emit("multi-select-item", selectedItem);
    },
    mutliSelectItem: function () {
      this.emitMultiSelectItem(this.result.item);
    }
  },
  template: /*html*/ `
      <div class="list-group-item h-100" v-on:click="mutliSelectItem" v-bind:class="{ 'border-info': isMultiSelected, 'border-warning': deprecatedText && !isMultiSelected }">
        <div class="row align-items-center">
          <div class="col-sm-1">
            <img v-bind:src="logo" v-on:error="setDefaultLogo" v-bind:alt="artifactId" width="60" height="60">
          </div>
          <div class="col-sm-10">
            <div class="row align-items-center">
              <h5 class="col-sm-6">
                {{ name }}
                <small class="text-muted" v-show="target">(Target&nbsp;{{ target }})</small>
              </h5>
              <div class="col-sm-4">
                <code>{{ groupId + ':' + artifactId }}</code>
              </div>
              <div class="col-sm-2" v-if="result.item.version">
                <small class="text-info">{{ result.item.version }}</small>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5">
              <span class="text-muted" v-text="description"></span>&nbsp;
              </div>
              <div class="col-sm-5">
                <div v-if="tags && tags.length > 0">
                  <span v-for="tag in tags"><span class="badge bg-info" v-bind:class="['badge-' + tag]">{{ tag }}</span>&nbsp;</span>
                </div>
              </div>
              <div class="col-sm-1">
                <span v-if="isDeprecated" class="text-warning">
                  <i class="fa fa-fw fa-warning" v-bind:title="deprecatedText"></i>
                </span>
                <span v-if="license" class="text-warning">
                  <i class="fa fa-fw fa-credit-card" title="This optional component requires an Interlok License"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="col-sm">
            <button v-on:click.stop="selectItem" class="btn btn-outline-primary">
              View
            </button>
          </div>
        </div>
      </div>
    `
};