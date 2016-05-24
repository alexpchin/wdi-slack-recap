(function(){
  "use strict";

  angular
    .module("slackRecap")
    .service("TokenService", TokenService);

  TokenService.$inject = ["$window"];
  function TokenService($window){
    var self = this;

    self.setToken = setToken;
    self.getToken = getToken;
    self.removeToken = removeToken;

    function setToken(token){
      return $window.localStorage.setItem("oauth-token", token);
    }

    function getToken(){
      return $window.localStorage.getItem("oauth-token");
    }

    function removeToken(){
      return $window.localStorage.removeItem("oauth-token");
    }
  }

})();