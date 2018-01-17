(function() {
    'use strict';
    
        angular
            .module('games.mastermind')
            .controller('MastermindController', MastermindController);
    
        function MastermindController() {
            var vm = this;
            vm.text = 'mastermind';
        }
    })();