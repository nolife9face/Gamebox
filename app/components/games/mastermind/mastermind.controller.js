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
            var colors = [];

            vm.guesses = [];

            vm.switchColor = switchColor;

            initialize();

            function initialize() {
                colors = initializeColors();
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
                        var guessColor = {
                            color: angular.copy(colors[0])
                        };
                        guessColor.column = j;
                        guess.colors.push(angular.copy(guessColor));
                    }
                    vm.guesses.push(angular.copy(guess));
                }

                vm.guesses = _.reverse(vm.guesses);
            }

            function switchColor(guess, row) {
                if (row.row === numberOfGuesses) {
                    guess.color = angular.copy(_.find(colors, function(color){
                        return color.value === guess.color.value + 1;
                    }));

                    if (angular.isUndefined(guess.color)) {
                        guess.color = angular.copy(colors[0]);
                    }
                }
            }
        }
    })();