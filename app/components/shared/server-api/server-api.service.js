(function() {
'use strict';

    angular
        .module('shared.server-api')
        .service('serverApi', serverApi);

    serverApi.inject = ['$http'];

    function serverApi($http) {
        var vm = this;

        vm.post = post;

        function post(url, content){
            $http.post(url, content);
        }
    }
})();