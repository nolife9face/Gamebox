(function() {
'use strict';

    angular
        .module('app.stats')
        .controller('YahtzeeStatsController', YahtzeeStatsController);

    YahtzeeStatsController.$inject = ['serverApi'];

    function YahtzeeStatsController(serverApi) {
        var vm = this;
        vm.yahtzeeStats = {};

        initialize();

        function initialize(){
            serverApi.get('http://localhost:8080/api/yahtzeeStats')
            .then(function(results){
                vm.yahtzeeStats = results.data;
                vm.yahtzeeStats.averageScore = Math.floor(vm.yahtzeeStats.averageScore);
                vm.yahtzeeStats.bonusPercentage = Math.floor((vm.yahtzeeStats.numberOfBonus / vm.yahtzeeStats.totalGamePlayed) * 100);
            });
        }        
    }
})();