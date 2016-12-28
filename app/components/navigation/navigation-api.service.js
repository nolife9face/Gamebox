(function() {
'use strict';

    angular
        .module('app.navigation')
        .service('navigationApi', navigationApi);

    function navigationApi() {
        var vm = this;
        
        vm.currentPage = '';
    }
})();