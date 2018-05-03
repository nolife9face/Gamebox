(function() {
    'use strict';
    
        angular
            .module('games.mastermind')
            .controller('MastermindController', MastermindController);
    
        MastermindController.$inject = ['serverApi', 'dialogApi'];

        function MastermindController(serverApi, dialogApi) {
            var vm = this;

            var maxGuesses = 12;
            var colorPerGuesses = 4;
            var colors = [];
            var answers = [];

            vm.numberOfGuesses = 0;
            vm.guesses = [];
            vm.colorCorrection = [];
            vm.colorPositionCorrection = [];
            vm.gameOver = false;
            vm.hasWon = false;
            vm.gameSaved = false;

            vm.switchColor = switchColor;
            vm.canGuess = canGuess;
            vm.guess = guess;
            vm.getAnswer = getAnswer;
            vm.saveGame = saveGame;

            initialize();

            function initialize() {
                colors = initializeColors();
                initializeGuesses();
                initializeCorrections();
                generateAnswer();
            }

            function newGame() {
                vm.numberOfGuesses = 0;
                vm.gameOver = false;
                vm.hasWon = false;
                vm.gameSaved = false;
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
                vm.guesses = [];
                var guess = {};
                for (var i = 0; i < maxGuesses; i++) {
                    guess.row = i;
                    guess.colors = [];
                    for (var j = 0; j < colorPerGuesses; j++) {
                        var guessColor = {
                            color: angular.copy(colors[j])
                        };
                        guessColor.column = j;
                        guess.colors.push(angular.copy(guessColor));
                    }
                    vm.guesses.push(angular.copy(guess));
                }
            }

            function initializeCorrections() {
                vm.colorCorrection = _.fill(Array(maxGuesses), 0);
                vm.colorPositionCorrection = _.fill(Array(maxGuesses), 0);
            }

            function generateAnswer() {
                answers = [];
                var copiedColors = angular.copy(colors);
                for (var i = 0; i < colorPerGuesses; i++) {
                    var index = getRandomInt(0, copiedColors.length);
                    var answer = {
                        column: i,
                        color: angular.copy(copiedColors[index])
                    }
                    answers.push(answer);
                    copiedColors.splice(index, 1);
                }
            }

            function switchColor(guess, row) {
                if (row.row === vm.numberOfGuesses) {
                    guess.color = angular.copy(_.find(colors, function(color){
                        return color.value === guess.color.value + 1;
                    }));

                    if (angular.isUndefined(guess.color)) {
                        guess.color = angular.copy(colors[0]);
                    }
                }
            }

            function canGuess() {
                var guessRemaining = vm.numberOfGuesses < maxGuesses;
                var uniqColors = false;

                if (guessRemaining) {
                    uniqColors = _.map(vm.guesses[vm.numberOfGuesses].colors, function (color) {
                        return color.color.name;
                    });

                    uniqColors = _.uniq(uniqColors).length === colorPerGuesses;
                }

                return uniqColors;
            }

            function guess() {
                if (vm.numberOfGuesses < maxGuesses) {
                    checkGuess();
                }

                vm.numberOfGuesses = Math.min(++vm.numberOfGuesses, maxGuesses);

                vm.gameOver = vm.hasWon || vm.numberOfGuesses === maxGuesses;
            }

            function getAnswer() {
                var result = _.reduce(answers, function(result, answer) {
                    return result.concat(answer.color.name, ' ');
                }, '');

                result = result.concat('was the answer.')

                return result;
            }

            function saveGame(){
                serverApi.post('http://localhost:8080/api/saveMastermind', {hasWon: vm.hasWon, numberOfGuesses: vm.numberOfGuesses})
                .then(function(){
                    dialogApi.confirm('New Game',
                        'Do you wan\'t to play a new game?', 'mastermindNewGame',
                        'Yes',
                        'No')
                        .then(function(){
                            newGame();
                            initialize();
                        },
                        function(){
                            vm.gameSaved =true;
                        });
                });
            }

            function checkGuess() {
                var colorAnswers = _.map(answers, function(answer){
                    return answer.color.name;
                });

                for (var i = 0; i < colorPerGuesses; i++) {
                    var correctColor = _.indexOf(colorAnswers, vm.guesses[vm.numberOfGuesses].colors[i].color.name) !== -1;

                    if (correctColor) {
                        vm.colorCorrection[vm.numberOfGuesses]++;
                    }

                   var correctColorPosition = _.some(answers, function(answer) {
                        return answer.column === vm.guesses[vm.numberOfGuesses].colors[i].column 
                            && answer.color.name === vm.guesses[vm.numberOfGuesses].colors[i].color.name;
                    });

                    if (correctColorPosition) {
                        vm.colorPositionCorrection[vm.numberOfGuesses]++;
                    }
                }

                vm.colorCorrection[vm.numberOfGuesses] -= vm.colorPositionCorrection[vm.numberOfGuesses];

                vm.hasWon = vm.colorPositionCorrection[vm.numberOfGuesses] === 4;
            }

            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
            }
        }
    })();