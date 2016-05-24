(function(){
  "use strict";

  angular
    .module("slackRecap")
    .controller("LoginController", LoginCtrl);

  LoginCtrl.$inject = ["API", "SLACK_ID", "Serializer"];
  function LoginCtrl(API, SLACK_ID, Serializer){
    var vm   = this;

    var data = {
      client_id: SLACK_ID,
      scope: "groups:history",
      redirect_uri: API + "/",
      team: "T0351JZQ0"
    };

    vm.slackLoginUrl = Serializer.serializeObject("https://slack.com/oauth/authorize", data);

    return vm;
  }


})();
