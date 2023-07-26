export default {
  props: {
    items: Array
  },
  computed: {
    parentVersion: function () {
      return "v" + (this.items.length > 0 ? this.items[0].version[0] : 5);
    },
    buildGradle: function () {
      const codeTemplate = `
ext {
  interlokParentGradle = "https://raw.githubusercontent.com/adaptris/interlok-build-parent/main/#interlokParentVersion/build.gradle"
}

allprojects {
  apply from: "\${interlokParentGradle}"
}

dependencies {
#interlokCompile

#interlokJavadocs
}
`;

const interlokCompile = [];
const interlokJavadocs = [];

      for (let index = 0; index < this.items.length; index++) {
        const item = this.items[index];
        interlokCompile.push(`  interlokCompile ("${item.groupId}:${item.artifactId}:${item.version}") { changing= true }`);
        interlokJavadocs.push(`  interlokJavadocs ("${item.groupId}:${item.artifactId}:${item.version}") { changing=true; transitive=false }`);
      }

      const code = codeTemplate.replace("#interlokParentVersion", this.parentVersion)
                               .replace("#interlokCompile", interlokCompile.join("\n"))
                               .replace("#interlokJavadocs", interlokJavadocs.join("\n"));

      return code;
    }
  },
  methods: {
    emitCloseModal: function (close) {
      this.$emit("close-modal", close);
    },
    copy: function () {
      navigator.clipboard.writeText(this.buildGradle);
    },
    close: function () {
      this.emitCloseModal(true);
    }
  },
  template: /*html*/ `
      <div class="modal-content modal-content-optional-component">
        <div class="modal-header">
          <h5 class="modal-title">
            Build.Gradle
          </h5>
          <button type="button" class="btn-close" aria-label="Close" v-on:click="close"></button>
        </div>
        <div class="modal-body">
          <div class="position-relative">
            <pre class="bg-light border rounded p-3"><code class="language-groovy" data-lang="groovy">{{buildGradle}}</code></pre>
            <button class="btn-outline-secondary rounded position-absolute" style="top: 0; right: 0" v-on:click="copy">
              <i class="fa fa-fw fa-copy" title="Copy code"></i>
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-danger" aria-label="Close" v-on:click="close">Close</button>
        </div>
      </div>
    `
};