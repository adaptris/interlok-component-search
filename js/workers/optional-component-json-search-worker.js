importScripts("https://cdn.jsdelivr.net/npm/fuse.js@6.4.6");
importScripts("../utils.js");

var adp = adp || {};

(function (utils, Fuse) {

  let fuseOptionalComponentsCaches = {};

  const fuseOptions = {
    includeScore: true,
    minMatchCharLength: 2,
    threshold: 0.3,
    ignoreLocation: true,
    useExtendedSearch: true,
    findAllMatches: true,
    /*ignoreFieldNorm: true,*/
    keys: [
      {
        name: "artifactId",
        weight: 0.9
      },
      {
        name: "name",
        weight: 0.9
      },
      {
        name: "tags",
        weight: 0.9
      },
      {
        name: "description",
        weight: 0.5
      }
    ]
  }

  async function fetchIndexJson(jsonFileURL) {
    const response = await fetch(jsonFileURL);

    if (!response.ok) {
      const message = `Could not open index file: ${response.status} -  ${response.statusText}.`;
      throw new Error(message);
    }

    const json = await response.json();
    return json;
  }

  async function prepareSearch(jsonFileURL) {
    if (fuseOptionalComponentsCaches[jsonFileURL] === undefined || fuseOptionalComponentsCaches[jsonFileURL] === null) {

      // Fetch the index json
      const json = await fetchIndexJson(jsonFileURL);

      // Get the optional components array
      const optionalComponents = json["optionalComponents"] || [];

      // Create a new instance of Fuse for components search
      fuseOptionalComponentsCaches[jsonFileURL] = new Fuse(optionalComponents, fuseOptions)
    }

    return fuseOptionalComponentsCaches[jsonFileURL];
  }

  function doSearch(fuse, query) {
    return fuse.search(query);
  }

  function prepareResults(json) {
    return {
      totalCount: json.length,
      optionalComponents: json
    };
  }

  onmessage = function (e) {
    console.log("Worker: Message received from main script");
    const jsonFileURL = e.data.jsonFileURL;
    // If no query we use a starts with .all. query which will return all
    const query = e.data.q || "!^.all.";
    console.log(query, jsonFileURL);

    prepareSearch(jsonFileURL)
      .then(fuse => doSearch(fuse, query))
      .then(results => prepareResults(results))
      .then(results => postMessage({ results }))
      .catch(error => setTimeout(function () { throw error; }));
  }

})(adp.utils, Fuse);
