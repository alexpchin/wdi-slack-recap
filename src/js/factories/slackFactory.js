(function(){
  "use strict";

  angular
    .module("slackRecap")
    .factory("Slack", Slack);

  Slack.$inject = [
    "$http", 
    "TokenService", 
    "Serializer", 
    "SLACK_CHANNEL",
    "API"
  ];

  function Slack($http, TokenService, Serializer, SLACK_CHANNEL, API){
    var self             = this;

    self.handshake       = handshake;
    self.archiveChannel  = archiveChannel;
    self.messages        = [];

    function handshake(code){
      $http({
        method: "POST",
        url: API + "/handshake",
        data: {
          code: code
        }
      }).then(function(response){
        TokenService.setToken(response.data.access_token);
      });
    }

    function archiveChannel(cb) {
      var token = TokenService.getToken();
      $http({
        method: "POST",
        url: API + "/messages",
        data: {
          access_token: token,
          slack_channel: SLACK_CHANNEL
        }
      }).then(function(response){
        console.log(response);
        cb(response);
      });
    }

    return this;
  }

})();