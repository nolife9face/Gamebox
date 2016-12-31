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
        vm.smallStraight = smallStraight;
        vm.largeStraight = largeStraight;
        vm.yahtzee = yahtzee;
        vm.getDicesTotalScore = getDicesTotalScore;

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

        function smallStraight(){
            var dicesValues = _.map(vm.dices, 'value');
            dicesValues.sort();
            dicesValues = _.uniqBy(dicesValues);
            return hasStraight(dicesValues, 4) || hasStraight(dicesValues, 5) ? 30 : 0;
        }
        
        function largeStraight(){
            var dicesValues = _.map(vm.dices, 'value');
            dicesValues.sort();
            dicesValues = _.uniqBy(dicesValues);
            return hasStraight(dicesValues, 5) ? 40 : 0;
        }

        function yahtzee(){
            return sameOfAKind(5) ? 50 : 0;
        }

        function getDicesTotalScore(){
            var totalScore = 0;

            for (var i = 1; i <= 6; i++){
                totalScore += getDiceScore(i)
            }

            return totalScore;
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

            foundSame = _.some(countByDice, function(diceCount){
                return diceCount === amount;
            });

            return foundSame;
        }

        function hasStraight(array, length){
            var sequences = new Array();
            sequences[0] = 0;

            for(var i = 1; i < array.length; i++){
                sequences[i] = (array[i] == array[i-1] + 1) ? (sequences[i-1] + 1) : 0;
            }

            var maxLength = Math.max.apply({},sequences);

            return maxLength + 1 === length;
        }
    }
})();