(function() {
'use strict';

    angular
        .module('stats.yahtzee')
        .controller('YahtzeeStatsController', YahtzeeStatsController);

    YahtzeeStatsController.$inject = ['serverApi'];

    function YahtzeeStatsController(serverApi) {
        var vm = this;

        initialize();

        function initialize(){
            serverApi.get('http://localhost:8080/api/yahtzeeStats')
            .then(function(results){

            });
        }        
    }
})();