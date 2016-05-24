(function(){
  "use strict";

  angular
    .module("slackRecap")
    .controller("SlackController", SlackCtrl);

  SlackCtrl.$inject = ["$stateParams", "$location", "$http", "SLACK_ID", "SLACK_SECRET", "API", "SLACK_CHANNEL"];
  function SlackCtrl($stateParams, $location, $http, SLACK_ID, SLACK_SECRET, API, SLACK_CHANNEL){
    var vm   = this;
    vm.name  = "Home";

    if ($location.search().code) {
      var data = $stateParams;
      data.client_id     = SLACK_ID;
      data.client_secret = SLACK_SECRET;
      data.code          = $location.search().code;
      data.redirect_uri  = API + "/";
      oauthAccess(serializeObject("http://slack.com/api/oauth.access", data));
    }

    function oauthAccess(url){
      $http({
        method: "GET",
        url: url
      }).then(function(response){
        console.log("oauthAccess", response);
        getGroupHistory(response.data.access_token);
      });
    }

    function getGroupHistory(token){
      var data = {
        token: token,
        channel: SLACK_CHANNEL,
        pretty: 1,
        count: 1000
      };

      $http({
        method: "GET",
        url: serializeObject("https://slack.com/api/groups.history", data)
      }).then(function(response){
        console.log(response);
      });
    }

    function serializeObject(url, obj){
      for (var key in obj) {
        if (url.indexOf("?") < 0) {
          url += "?";
        } else if (url !== "") {
          url += "&";
        }
        url += key + "=" + encodeURIComponent(obj[key]);
      }
      return url;
    }

    return vm;
  }

})();
