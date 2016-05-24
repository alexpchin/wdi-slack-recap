(function(){
  "use strict";

  angular
    .module("slackRecap")
    .controller("LoginController", LoginCtrl);

  LoginCtrl.$inject = ["API", "SLACK_ID"];
  function LoginCtrl(API, SLACK_ID){
    var vm   = this;

    var data = {
      client_id: SLACK_ID,
      scope: "groups:history",
      redirect_uri: API + "/",
      team: "T0351JZQ0"
    };

    vm.slackLoginUrl = serializeObject("https://slack.com/oauth/authorize", data);

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
