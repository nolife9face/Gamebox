(function() {
    'use strict';
    
        angular
            .module('games.mastermind')
            .controller('MastermindController', MastermindController);
    
        function MastermindController() {
            var vm = this;

            var maxGuesses = 12;
            var colorPerGuesses = 4;
            var numberOfGuesses = 0;

            vm.colors = [];
            vm.guesses = [];

            initialize();

            function initialize() {
                vm.colors = initializeColors();
                initializeGuesses();
            }

            function initializeColors() {
                return [
                    {
                        value: 0,
                        name: 'red'
                    },
                    {
                        value: 1,
                        name: 'blue'
                    },
                    {
                        value: 2,
                        name: 'yellow'
                    },
                    {
                        value: 3,
                        name: 'green'
                    },
                    {
                        value: 4,
                        name: 'white'
                    },
                    {
                        value: 5,
                        name: 'black'
                    }
                ]
            }

            function initializeGuesses() {
                var guess = {};
                for (var i = 0; i < maxGuesses; i++) {
                    guess.row = i;
                    guess.colors = [];
                    for (var j = 0; j < colorPerGuesses; j++) {
                        guess.colors.push(vm.colors[0]);
                    }
                    vm.guesses.push(angular.copy(guess));
                }
            }
        }
    })();