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
            <pre class="bg-light border rounded">
              <code class="language-groovy" data-lang="html">
  compile ("{{this.gav}}") { changing= true}
              </code>
            </pre>
          </p>
          <p>
            <h5>Gradle using Interlok Parent</h5>
            <pre class="bg-light border rounded">
              <code class="language-groovy" data-lang="html">
  interlokCompile ("{{this.gav}}") { changing= true}
              </code>
            </pre>
          </p>
        </div>
      </div>
    `
};