var adp = adp || {};

(function(adp) {
  adp.utils = adp.utils || {};

  function humanyze(str) {
    var humanized = str;
    if (str != null) {
      humanized = "";
      var words = [];
      var splitBySpace = str.split(/[\s]/g);
      for (var i = 0; i < splitBySpace.length; i++) {
        if (splitBySpace[i].length == 1) {
          words.push(splitBySpace[i]);
        } else {
          var split = splitBySpace[i].split(/[_\-\.]/g);
          for (var j = 0; j < split.length; j++) {
            split[j].replace(/((^[a-z0-9\W]+)|([A-Z]+[0-9\W]+[A-Z]+)|([A-Z]+[0-9\W]+[0-9]+)|([A-Z]+[0-9\W]{1}[A-Z]*)|([A-Z]{1,2}[a-z0-9\W]+)|([A-Z]+(?=([A-Z][a-z0-9\W])|($))))/g, function(match) {
              words.push(match);
            });
          }
        }
      }
      for (var w = 0; w < words.length; w++) {
        var word = words[w];
        humanized += word.charAt(0).toUpperCase() + word.slice(1);
        if (w < words.length) {
          humanized += " ";
        }
      }
      humanized = humanized.replace(/(\s)(\s|$)/g, "$2");
    }
    return humanized;
  };
  adp.utils.humanyze = humanyze;

  function isEmpty(str) {
    return str === undefined || str === null || str === "";
  }
  adp.utils.isEmpty = isEmpty;

  function toLowerCase(str) {
    return isEmpty(str) ? "" : str.toLowerCase();
  }
  adp.utils.toLowerCase = toLowerCase;

  function includesIgnoreCase(str1, str2) {
    return toLowerCase(str1).includes(toLowerCase(str2));
  }
  adp.utils.includesIgnoreCase = includesIgnoreCase;

})(adp);
