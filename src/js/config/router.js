(function(){
  "use strict";

  angular
    .module("slackRecap")
    .config(Router);

    Router.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
    function Router($stateProvider, $locationProvider, $urlRouterProvider){
      $locationProvider.html5Mode(true);
      $stateProvider
      .state("home", {
        url:          "/",
        templateUrl:  "/html/slack.html",
        controller:   "SlackController",
        controllerAs: "slack"
      });
      $urlRouterProvider.otherwise("/");
    }

})();
