(function() {
'use strict';

    angular
        .module('games.yahtzee')
        .controller('YahtzeeController', YahtzeeController);

    function YahtzeeController() {
        var vm = this;
        var rollsMade = 0;

        vm.dices = [];

        vm.rollingAllowed = rollingAllowed;
        vm.rollDices = rollDices;
        vm.keepDice = keepDice;
        vm.unkeepDice = unkeepDice;
        vm.getDiceScore = getDiceScore;
        vm.threeOfAKind = threeOfAKind;
        vm.fourOfAKind = fourOfAKind;
        vm.fullHouse = fullHouse;

        initialize();

        function rollingAllowed(){
            return rollsMade < 3;
        }

        function rollDices(){
            if(rollingAllowed()){
                for (var i = 0; i < 5; i++) {
                    if(!vm.dices[i].kept){
                        vm.dices[i].value = Math.floor(Math.random() * 6) + 1;
                        assignClass(vm.dices[i]);
                    }
                }
                rollsMade++;
            }
            else{
                resetDices();
            }
        }

        function keepDice(dice){
            dice.kept = true;
        }

        function unkeepDice(dice){
            dice.kept = false;
        }

        function getDiceScore(value){
            return _.sumBy(vm.dices, function(dice) { return dice.value === value ? value : 0; });
        }

        function threeOfAKind(){
            return sameOfAKind(3) || sameOfAKind(4) ? getDicesTotalScore() : 0;
        }

        function fourOfAKind(){
            return sameOfAKind(4) ? getDicesTotalScore() : 0;
        }

        function fullHouse(){
            return sameOfAKind(2) && sameOfAKind(3) ? 25 : 0;
        }

        function initialize(){
            for (var i = 0; i < 5; i++) {
                vm.dices[i] = {value: i + 1, kept: false};
                assignClass(vm.dices[i]);
            }
        }

        function assignClass(dice){
            switch(dice.value){
                case 1:
                    dice.class = "dice-one";
                    break;
                case 2:
                    dice.class = "dice-two";
                    break;
                case 3:
                    dice.class = "dice-three";
                    break;
                case 4:
                    dice.class = "dice-four";
                    break;
                case 5:
                    dice.class = "dice-five";
                    break;
                case 6:
                    dice.class = "dice-six";
                    break;
            }
        }

        function resetDices(){
            rollsMade = 0;
            for (var i = 0; i < 5; i++) {
                vm.dices[i].kept = false;
            }
        }

        function sameOfAKind(amount){
            var foundSame = false;
            var countByDice = _.countBy(vm.dices, 'value');

            for(var i = 1; i <= 6 && !foundSame; i++){
                foundSame = countByDice[i] === amount;
            }

            return foundSame;
        }

        function getDicesTotalScore(){
            var totalScore = 0;

            for (var i = 1; i <= 6; i++){
                totalScore += getDiceScore(i)
            }

            return totalScore;
        }
    }
})();