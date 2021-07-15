import adpUtils from "../../utils-module.js"
//import { VueShowdown } from "vue-showdown";

export default {
  components: {
    "VueShowdown": VueShowdown
  },
  props: {
    item: Object
  },
  data: function () {
    return {
      readme: ""
    };
  },
  created: async function () {
    if (this.hasReadmeUrl) {
      try {
        this.readme = await this.fetchReadme(this.readmeUrl);
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    readmeUrl: function () {
      return this.item.readmeUrl;
    },
    hasReadmeUrl: function () {
      return !adpUtils.isEmpty(this.item.readmeUrl);
    },
    hasReadme: function () {
      return !adpUtils.isEmpty(this.readme);
    }
  },
  methods: {
    githubToGithubUserContent: function (url) {
      // Conver the github readme url to a githubusercontent url
      // https://github.com/adaptris/project-name/raw/develop/README.md to
      // https://raw.githubusercontent.com/adaptris/project-name/develop/README.md
      return url.replace(/https:\/\/github.com\/(.*)\/raw\/(.*)/, "https://raw.githubusercontent.com/$1/$2");
    },
    fetchReadme: async function (readmeURL) {
      const accessibleUrl = this.githubToGithubUserContent(readmeURL);

      const response = await fetch(accessibleUrl, {
        mode: 'cors', // cors, no-cors, *cors, same-origin,
        redirect: 'follow' // manual, *follow, error,
      });

      if (!response.ok) {
        const message = `Could not open readme: ${response.status} -  ${response.statusText}.`;
        throw new Error(message);
      }
      const text = await response.text();
      return text;
    }
  },
  template: /*html*/ `
      <div>
        <div>
          <h4>ReadMe</h4>
          <p>
            <div v-if="hasReadme" class="border rounded p-3">
              <VueShowdown
                v-bind:markdown="readme"
                flavor="github"
              />
            </div>
            <div v-else class="border rounded p-3">
              No ReadMe content
            </div>
          </p>
        </div>
      </div>
    `
};