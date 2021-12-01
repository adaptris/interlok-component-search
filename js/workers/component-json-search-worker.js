importScripts("https://cdn.jsdelivr.net/npm/fuse.js@6.4.6");
importScripts("../utils.js");

var adp = adp || {};

(function (utils, Fuse) {

  let fuseComponentsCaches = {};

  let fuseInstancesCaches = {};

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
        name: "fullClassName",
        weight: 0.9
      },
      {
        name: "className",
        weight: 0.9
      },
      {
        name: "packageName",
        weight: 0.5
      },
      {
        name: "alias",
        weight: 0.9
      },
      {
        name: "componentType",
        weight: 0.5
      },
      {
        name: "profile.tag",
        weight: 0.9
      },
      {
        name: "profile.summary",
        weight: 0.4
      },
      {
        name: "projectInfo.Implementation-Title",
        weight: 0.5
      },
      {
        name: "projectInfo.Implementation-Id.",
        weight: 0.5
      }
    ]
  }

  const fuseInstancesOptions = {
    includeScore: true,
    minMatchCharLength: 2,
    threshold: 0.3,
    ignoreLocation: true,
    useExtendedSearch: true,
    findAllMatches: true,
    /*ignoreFieldNorm: true,*/
    keys: [
      {
        name: "parents",
        weight: 5
      },
      {
        name: "fullClassName",
        weight: 0.9
      },
      {
        name: "className",
        weight: 0.9
      },
      {
        name: "packageName",
        weight: 0.5
      },
      {
        name: "alias",
        weight: 0.9
      },
      {
        name: "componentType",
        weight: 0.5
      },
      {
        name: "profile.tag",
        weight: 0.9
      },
      {
        name: "projectInfo.Implementation-Title",
        weight: 0.5
      },
      {
        name: "projectInfo.Implementation-Id.",
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

  async function prepareSearch(jsonFileURL, type) {
    if (fuseComponentsCaches[jsonFileURL] === undefined || fuseComponentsCaches[jsonFileURL] === null) {

      // Fetch the index json
      const json = await fetchIndexJson(jsonFileURL);

      // Get the components array
      const components = json.components || [];

      // Create a new instance of Fuse for components search
      fuseComponentsCaches[jsonFileURL] = new Fuse(components, fuseOptions)

      // Create a new instance of Fuse for instances search
      fuseInstancesCaches[jsonFileURL] = new Fuse(components, fuseInstancesOptions)
    }

    return type === "instances" ? fuseInstancesCaches[jsonFileURL] : fuseComponentsCaches[jsonFileURL];
  }

  function doSearch(fuse, query) {
    return fuse.search(query);
  }

  function preparePagination(json) {
    return {
      totalCount: json.length,
      components: json
    };
  }

  onmessage = function (e) {
    console.log("Worker: Message received from main script");
    if (!utils.isEmpty(e.data.q) && (e.data.q.constructor == Object || e.data.q.length > 1)) {
      const jsonFileURL = e.data.jsonFileURL;
      const query = e.data.q;
      const type = e.data.type;
      console.log(query, type, jsonFileURL);

      prepareSearch(jsonFileURL, type)
        .then(fuse => doSearch(fuse, query))
        .then(results => preparePagination(results))
        .then(results => postMessage({ results }))
        .catch(error => setTimeout(function () { throw error; }));

    } else {
      postMessage({ results: [], error: "Use more than 1 character" })
    }
  }

})(adp.utils, Fuse);
