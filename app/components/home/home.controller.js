(function() {
'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['navigationApi'];

    function HomeController(navigationApi) {
        var vm = this;
        
        vm.navigationApi = navigationApi;
    }
})();