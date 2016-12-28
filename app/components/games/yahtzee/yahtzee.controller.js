(function() {
'use strict';

    angular
        .module('games.yahtzee')
        .controller('YahtzeeController', YahtzeeController);

    function YahtzeeController() {
        var vm = this;

        vm.dices = [];

        vm.rollDices = rollDices;

        initialize();

        function rollDices(){
            for (var i = 0; i < 5; i++) {
                vm.dices[i].value = Math.floor(Math.random() * 6) + 1  ;
            }
        }

        function initialize(){
            for (var i = 0; i < 5; i++) {
                vm.dices[i] = {value: i + 1};
            }
        }
    }
})();