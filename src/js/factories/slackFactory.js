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
    this.handshake       = handshake;
    this.getGroupHistory = getGroupHistory;

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

    function getGroupHistory(timestamp){
      var token = TokenService.getToken();
      var data = {
        token: token,
        channel: SLACK_CHANNEL,
        pretty: 1,
        count: 1000,
        latest: timestamp || ""
      };

      return $http({
        method: "GET",
        url: Serializer.serialize("https://slack.com/api/groups.history", data)
      }).then(function(response){
        if (response.data.has_more === true) {
          var messages = response.data.messages;
          var timestamp = messages[messages.length-1].ts;
          return getGroupHistory(timestamp);
        } 
      });
    }

    return this;
  }

})();