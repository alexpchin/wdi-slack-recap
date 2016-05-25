(function(){
  "use strict";

  angular
    .module("slackRecap")
    .service("Serializer", Serializer);

  function Serializer(){
    this.serialize = function(url, obj){
      for (var key in obj) {
        if (url.indexOf("?") < 0) {
          url += "?";
        } else if (url !== "") {
          url += "&";
        }
        url += key + "=" + encodeURIComponent(obj[key]);
      }
      return url;
    };
  }

})();