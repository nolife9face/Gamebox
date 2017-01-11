(function() {
'use strict';

    angular
        .module('shared.server-api')
        .service('serverApi', serverApi);

    serverApi.inject = ['$http'];

    function serverApi($http) {
        var vm = this;

        vm.get = get;
        vm.post = post;

        function get(url){
            return $http.get(url);
        }

        function post(url, content){
            return $http.post(url, content);
        }
    }
})();