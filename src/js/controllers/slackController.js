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
      Slack.getGroupHistory(null, processData);
    }

    function processData(data) {
      vm.messages = data;
      vm.messageCount = data.length;
      vm.gifs = filterGifs();
    }

    function filterGifs() {
      return vm.messages.filter(function(message) {
        if (!message.attachments) return;
        for (var i = 0; i < message.attachments.length; i++) {
          var attachment = message.attachments[i];
          if (attachment.image_url && attachment.image_url.indexOf("gif") > -1) {
            return true;
          }  
        }
      });
    }

    return vm;
  }

})();
