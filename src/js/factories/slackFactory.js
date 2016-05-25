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
    self.getGroupHistory = getGroupHistory;
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

    function getGroupHistory(timestamp, cb){
      var token = TokenService.getToken();
      var data = {
        token: token,
        channel: SLACK_CHANNEL,
        pretty: 1,
        count: 1000,
        latest: timestamp
      };

      return $http({
        method: "GET",
        url: Serializer.serialize("https://slack.com/api/groups.history", data)
      }).then(function(response){
        var messages = response.data.messages;
        self.messages.push.apply(self.messages, messages);
        var timestamp = messages[messages.length-1].ts;
        if (response.data.has_more === true) return getGroupHistory(timestamp, cb);
        return cb(self.messages);
      });
    }

    return this;
  }

})();