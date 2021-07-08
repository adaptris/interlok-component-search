import adpUtils from "../../utils-module.js"

export default {
  props: {
    result: Object
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
    title: function () {
      return adpUtils.humanyze(this.result.item.alias || this.result.item.className);
    },
    summary: function () {
      return this.result.item.profile && this.result.item.profile.summary ? this.result.item.profile.summary : this.description.substring(0, Math.min(this.description.length, 50));
    },
    description: function () {
      return this.result.item.description || "";
    },
    fullDescription: function () {
      return adpUtils.purify(this.result.item.descriptionHtml) || "No description";
    },
    author: function () {
      return this.result.item.profile && this.result.item.profile.author ? this.result.item.profile.author : "";
    },
    since: function () {
      return this.result.item.profile && this.result.item.profile.since ? this.result.item.profile.since : "";
    },
    tags: function () {
      return this.result.item.profile && this.result.item.profile.tag ? this.result.item.profile.tag.split(",") : [];
    }
  },
  methods: {
    toggleFullDesc: function () {
      this.showFullDesc = !this.showFullDesc;
    }
  },
  template: /*html*/ `
      <li class="mb-2">
        <div class="card" v-bind:class="[borderClass]">
          <div class="card-body">
            <h5 class="card-title">
              <i class="fa" v-bind:class="[iconClass]"></i>&nbsp;{{ title }}
              <small class="text-muted" v-show="since">(Since&nbsp;{{ since }})</small>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted" title="Author">{{ author }}</h6>
            <p class="card-text mb-2">
              <a v-bind:href="result.item.pageUrl" class="card-link" target="_blank">{{ result.item.fullClassName }}</a>
              <span v-show="result.item.alias">
                -
                <code>{{ result.item.alias }}</code>
              </span>
            </p>
            <p class="card-text mb-2">
              <span class="text-muted" v-text="summary"></span>&nbsp;
              <a href="#" v-on:click.prevent="toggleFullDesc" v-text="showFullDesc ? 'Less...' : 'More...'"></a>
            </p>
            <p class="card-text mb-2" v-show="showFullDesc" v-html="fullDescription"></p>
            <p class="card-text mb-2" v-if="result.item.projectInfo">
              <small class="text-info">{{ result.item.projectInfo["Implementation-Title"] + ' ' + result.item.projectInfo["Implementation-Version"] }}</small>
            </p>
            <p class="card-text" v-if="tags && tags.length > 0">
              <span v-for="tag in tags"><span class="badge bg-info" v-bind:class="['badge-' + tag]">{{ tag }}</span>&nbsp;</span>
            </p>
          </div>
        </div>
      </li>
    `
};