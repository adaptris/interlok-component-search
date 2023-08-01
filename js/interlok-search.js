// web component
class InterlokSearch extends HTMLElement {

  constructor() {
    // Always call super first in constructor
    super();
  }

    // connect component
  connectedCallback() {
    var div = document.createElement( "div" )
    const shadow = this.attachShadow({ mode: 'open' });

    const page = this.getAttribute("page") == "optional-component-search" ? this.getAttribute("page")  : "component-search";
    const listViewParam = this.hasAttribute("listView") ? "?listView=" + (this.getAttribute("listView") == "true") : "";

    div.innerHTML = /*html*/`
    <iframe class="interlok-search-iframe"
            src="https://interlok.adaptris.net/interlok-component-search/index-embeddable.html#/${page}${listViewParam}"
            frameBorder="0"
            style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; height: 100%; width: 100%;"/>
    `;

    shadow.appendChild( div )
  }
  

}

// register component
customElements.define( 'interlok-search', InterlokSearch );