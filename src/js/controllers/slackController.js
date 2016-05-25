(function(){
  "use strict";

  angular
    .module("slackRecap")
    .controller("SlackController", SlackCtrl);
  
  SlackCtrl.$inject = [
    "$stateParams", 
    "$location", 
    "API", 
    "TokenService", 
    "Slack"
  ];
  
  function SlackCtrl($stateParams, $location, API, TokenService, Slack){
    var vm      = this;
    vm.name     = "Home"; 

    if ($location.search().code) Slack.handshake($location.search().code);
    if (TokenService.getToken()) {
      Slack.getGroupHistory(null, function(data){
        vm.messages = data;
      });
    }
    return vm;
  }

})();
