export default {
  props: {
    item: Object
  },
  computed: {
    groupId: function () {
      return this.item.groupId;
    },
    artifactId: function () {
      return this.item.artifactId;
    },
    version: function () {
      return this.item.version || "";
    },
    gav: function () {
      return `${this.groupId}:${this.artifactId}:${this.version}:`;
    },
    compileCode: function () {
      return `compile ("${this.gav}") { changing= true}`;
    },
    interlokCompileCode: function () {
      return `interlokCompile ("${this.gav}") { changing= true}`;
    }
  },
  methods: {
    copy: function (text) {
      navigator.clipboard.writeText(text);
    }
  },
  template: /*html*/ `
      <div>
        <div>
          <h4>Build Information</h4>
          <p>
            <small>Helpful snippets for your build tools</small>
          </p>
          <p>
            <h5>Gradle</h5>
            <div class="position-relative">
              <pre class="bg-light border rounded p-3">
<code class="language-groovy" data-lang="groovy">{{compileCode}}</code>
              </pre>
              <button class="btn-outline-secondary rounded position-absolute" style="top: 0; right: 0" v-on:click="copy(compileCode)">
                <i class="fa fa-fw fa-copy" title="Copy code"></i>
              </button>
            </div>
          </p>
          <p>
            <h5>Gradle using Interlok Parent</h5>
            <div class="position-relative">
             <pre class="bg-light border rounded p-3">
<code class="language-groovy" data-lang="groovy">{{interlokCompileCode}}</code>
              </pre>
              <button class="btn-outline-secondary rounded position-absolute" style="top: 0; right: 0" v-on:click="copy(interlokCompileCode)">
                <i class="fa fa-fw fa-copy" title="Copy code"></i>
              </button>
            </div>
          </p>
        </div>
      </div>
    `
};