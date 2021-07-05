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
    componentTypeClass: function () {
      return this.result.item.componentType == "object" ? "extension" : this.result.item.componentType;
    },
    iconClass: function () {
      return "fa-" + this.componentTypeClass;
    },
    borderClass: function () {
      return "border-" + this.componentTypeClass;
    },
    artifactId: function () {
      return this.result.item.artifactId;
    },
    groupId: function () {
      return this.result.item.groupId;
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
    }
  },
  template: /*html*/ `
      <div class="col">
        <div class="card h-100 card-optional-component" v-bind:class="[borderClass]">
        <img v-bind:src="logo" v-on:error="setDefaultLogo" class="card-img-top" v-bind:alt="artifactId">
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
          </div>
          <div class="card-footer bg-transparent">
            <p class="" v-if="tags && tags.length > 0">
              <span v-for="tag in tags"><span class="badge bg-info" v-bind:class="['badge-' + tag]">{{ tag }}</span>&nbsp;</span>
            </p>
            <p class="" v-else>
              <span class="badge">No Tag</span>
            </p>
          </div>
        </div>
      </div>
    `
};