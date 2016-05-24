(function(){
  "use strict";

  angular
    .module("slackRecap")
    .controller("SlackController", SlackCtrl);

  function SlackCtrl(){
    var vm  = this;
    vm.name = "Home";
    return vm;
  }

})();
