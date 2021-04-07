var adp = adp || {};

(function(adp) {
  adp.url = adp.url || {};

  function getContextPath() {
    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
      return window.location.pathname.substring(0, window.location.pathname.indexOf("/ui", 1));
    } else {
      return "/interlok-component-search";
    }
  }

  adp.url.context = getContextPath();             // "/interlok-component-search"
  adp.url.api = getContextPath() + "/api";
  adp.url.components = adp.url.api + "/components";

})(adp);

(function(adp) {
  adp.link = adp.link || {};

  adp.link.devBase = "https://development.adaptris.net/";
  adp.link.dev = adp.link.devBase + "index.html";
  adp.link.installers = adp.link.devBase + "installers/Interlok/latest-stable/";
  adp.link.docBase = adp.link.devBase + "docs/Interlok/";
  adp.link.adpBase = "http://www.adaptris.com/";
  adp.link.aboutUs = adp.link.adpBase + "pages/about-us/about-adaptris";
  adp.link.contactUs = adp.link.adpBase + "pages/contact-adaptris";

})(adp);
