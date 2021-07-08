export default {
  props: {
    item: Object,
    contactUsUrl: String
  },
  computed: {
    license: function () {
      return this.item.license;
    },
    url: function () {
      return this.item.url;
    },
    nexusUrl: function () {
      return this.item.nexusUrl;
    },
    mavenUrl: function () {
      return this.item.mavenUrl;
    },
    mavenMetadataUrl: function () {
      return this.item.mavenMetadataUrl;
    },
    externalUrl: function () {
      return this.item.externalUrl;
    },
    javadocsUrl: function () {
      return this.item.javadocsUrl;
    },
    javadocsUrl: function () {
      return this.item.javadocsUrl;
    },
    repositoryUrl: function () {
      return this.item.repositoryUrl;
    }
  },
  template: /*html*/ `
      <div>
        <div>
          <h4>External Information Links</h4>
          <table class="table table-hover table-condensed">
            <tbody>
              <tr v-show="license">
                <td>
                  <a v-bind:href="contactUsUrl" class="btn btn-outline-dark" target="_blank" rel="noreferrer noopener" role="button" title="This optional component requires an Interlok License">
                    <i class="fa fa-fw fa-credit-card"></i>
                  </a>
                </td>
                <td>
                  This optional component requires an <b title="Interlok is an open source product, but some of it's optional component do require an Interlok license to operate. You can obtain a license by contacting Adaptris Support.">Interlok License</b>
                  <br>
                  <a v-bind:href="contactUsUrl" class="text-reset" target="_blank" rel="noreferrer noopener" title="This optional component requires an Interlok License">{{contactUsUrl}}</a>
                </td>
              </tr>
              <tr v-show="url">
                <td>
                  <a v-bind:href="url" target="_blank" rel="noreferrer noopener" class="btn btn-outline-dark" role="button" title="View the project home page for this optional component">
                    <i class="fa fa-fw fa-home"></i>
                  </a>
                </td>
                <td>
                  View the <b title="This component has a project home, i.e. some documentation to read!">Project Home</b> page for this optional component
                  <br>
                  <a v-bind:href="url" class="text-reset" target="_blank" rel="noreferrer noopener" title="View the project home page for this optional component">{{url}}</a>
                </td>
              </tr>
              <tr v-show="nexusUrl">
                <td>
                  <a v-bind:href="nexusUrl" target="_blank" rel="noreferrer noopener" class="btn btn-outline-dark" role="button" title="Browse this optional components nexus repository directly">
                    <i class="fa fa-fw fa-folder-open-o"></i>
                  </a>
                </td>
                <td>
                  Browse this optional components <b title="Nexus is a repository manager and you will find a collection of various resources relating to this optional component within it, including pom files, jars, javadoc jars, examples, etc.">Nexus</b> repository directly
                  <br>
                  <a v-bind:href="nexusUrl" class="text-reset" target="_blank" rel="noreferrer noopener" title="Browse this optional components nexus repository directly">{{nexusUrl}}</a>
                </td>
              </tr>
              <tr v-show="mavenUrl">
                <td>
                  <a v-bind:href="mavenUrl" target="_blank" rel="noreferrer noopener" class="btn btn-outline-dark" role="button" title="View the Maven POM file for this optional component">
                    <i class="fa fa-fw fa-file-code-o"></i>
                  </a>
                </td>
                <td>
                  View the <b title="The Maven Project Object Model file is an XML file that contains information about the project and configuration details used by Maven to build the project.">Maven POM</b> file for this optional component
                  <br>
                  <a v-bind:href="mavenUrl" class="text-reset" target="_blank" rel="noreferrer noopener" title="View the Maven POM file for this optional component">{{mavenUrl}}</a>
                </td>
              </tr>
              <tr v-show="mavenMetadataUrl">
                <td>
                  <a v-bind:href="mavenMetadataUrl" target="_blank" rel="noreferrer noopener" class="btn btn-outline-dark" role="button" title="View the Maven Metadata file for this optional component">
                    <i class="fa fa-fw fa-clock-o"></i>
                  </a>
                </td>
                <td>
                  View the <b title="The Maven Repository Metadata is file that gives informations about available versions of the artifact (this optional component)">Maven Metadata</b> file for this optional component
                  <br>
                  <a v-bind:href="mavenMetadataUrl" class="text-reset" target="_blank" rel="noreferrer noopener" title="View the Maven Metadata file for this optional component">{{mavenMetadataUrl}}</a>
                </td>
              </tr>
              <tr v-show="externalUrl">
                <td>
                  <a v-bind:href="externalUrl" target="_blank" rel="noreferrer noopener" class="btn btn-outline-dark" role="button" title="More information regarding the topic of this optional component">
                    <i class="fa fa-fw fa-external-link"></i>
                  </a>
                </td>
                <td>
                  View <b title="This resource has been recommended by the developer of this optional component, so it's probably worth checking out !">more information</b> regarding the topic of this optional component
                  <br>
                  <a v-bind:href="externalUrl" class="text-reset" target="_blank" rel="noreferrer noopener" title="More information regarding the topic of this optional component">{{externalUrl}}</a>
                </td>
              </tr>
              <tr v-show="javadocsUrl">
                <td>
                  <a v-bind:href="javadocsUrl" target="_blank" rel="noreferrer noopener" class="btn btn-outline-dark" role="button" title="View the javadocs for this optional component">
                    <i class="fa fa-fw fa-book"></i>
                  </a>
                </td>
                <td>
                  View the <b title="The JavaDocs are documentation pages generated by the source code from this optional components Java Classes">Javadocs</b> for this optional component
                  <br>
                  <a v-bind:href="javadocsUrl" class="text-reset" target="_blank" rel="noreferrer noopener" title="View the javadocs for this optional component">{{javadocsUrl}}</a>
                </td>
              </tr>
              <tr v-show="repositoryUrl">
                <td>
                  <a v-bind:href="repositoryUrl" target="_blank" rel="noreferrer noopener" class="btn btn-outline-dark" role="button" title="View the Repository Page for this optional component">
                    <i class="fa fa-fw fa-code-fork"></i>
                  </a>
                </td>
                <td>
                  View the <b title="GitHub/GitLab/Bitbucket are all repository hosting services, and this url is where you can find this optional component in the given repository; useful if you want to clone the repository and read the source code">Repository</b> Page for this optional component
                  <br>
                  <a v-bind:href="repositoryUrl" class="text-reset" target="_blank" rel="noreferrer noopener" title="View the Repository Page for this optional component">{{repositoryUrl}}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
};