export default {
  props: {
    item: Object,
    logoLocationUrl: String,
  },
  computed: {
    groupId: function () {
      return this.item.groupId;
    },
    artifactId: function () {
      return this.item.artifactId;
    },
    description: function () {
      return this.item.description || "";
    },
    target: function () {
      return this.item.target ? this.item.target : "";
    },
    version: function () {
      return this.item.version ? this.item.version : "";
    },
    tags: function () {
      return this.item.tags ? this.item.tags : "";
    },
    repositoryId: function () {
      return this.item.repositoryId;
    },
    downloadUrl: function () {
      return this.item.downloadUrl;
    },
    logo: function () {
      return `${this.logoLocationUrl}/${this.artifactId}.png`;
    }
  },
  template: /*html*/ `
      <div>
        <div>
          <h4>Main Details</h4>
          <dl class="row">
            <dt class="col-sm-3">Description:</dt>
            <dd class="col-sm-9">{{description}}</dd>
            <dt class="col-sm-3">For Interlok Version:</dt>
            <dd class="col-sm-9">{{target}}</dd>
          
            <dt class="col-sm-3">Nexus Details:</dt>
            <dd class="col-sm-9">
              <dl class="row">
                <dt class="col-sm-4">Group ID:</dt>
                <dd class="col-sm-8">{{ groupId }}</dd>
                <dt class="col-sm-4">Artifact ID:</dt>
                <dd class="col-sm-8">{{ artifactId }}</dd>
                <dt class="col-sm-4">Version:</dt>
                <dd class="col-sm-8">{{ version }}</dd>
                <dt class="col-sm-4">Repository ID:</dt>
                <dd class="col-sm-8">{{ repositoryId }}</dd>
                <dt class="col-sm-4">Tags:</dt>
                <dd class="col-sm-8">{{ tags }}</dd>
              </dl>
            </dd>
          </dl>
          <h4>Download Resources</h4>
          <table class="table table-condensed table-borderless">
            <tbody>
              <tr v-show="downloadUrl">
                <td>
                  <a v-bind:href="downloadUrl" class="btn btn-outline-dark" role="button" title="Download the artifact jar for this optional component">
                    <i class="fa fa-fw fa-download"></i>
                  </a>
                </td>
                <td>
                  Download <i>only</i> the artifact jar for this optional component (You will still <b title="the optional components dependency jars must be available on the classpath along with the optional component jar, otherwise the component simply will not work. ">require the dependency jars</b> for this optional component)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
};