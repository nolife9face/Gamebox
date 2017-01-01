(function() {
'use strict';

    angular
        .module('games.yahtzee')
        .controller('YahtzeeController', YahtzeeController);

    YahtzeeController.$inject = ['serverApi'];

    function YahtzeeController(serverApi) {
        var vm = this;
        var rollsMade = 0;
        var turnStarted = false;
        var scoreSheet = initializeScoreSheet();

        vm.dices = [];

        vm.rollingAllowed = rollingAllowed;
        vm.rollDices = rollDices;
        vm.keepDice = keepDice;
        vm.unkeepDice = unkeepDice;
        vm.showScore = showScore;
        vm.getDiceScore = getDiceScore;
        vm.threeOfAKind = threeOfAKind;
        vm.fourOfAKind = fourOfAKind;
        vm.fullHouse = fullHouse;
        vm.smallStraight = smallStraight;
        vm.largeStraight = largeStraight;
        vm.yahtzee = yahtzee;
        vm.getDicesTotalScore = getDicesTotalScore;
        vm.playMove = playMove;
        vm.getMoveScore = getMoveScore;
        vm.wasMovePlayed = wasMovePlayed;
        vm.showUpperSectionTotal = showUpperSectionTotal;
        vm.upperSectionTotal = upperSectionTotal;
        vm.upperSectionBonus = upperSectionBonus;
        vm.upperSectionGrandTotal = upperSectionGrandTotal;
        vm.showLowerSectionTotal = showLowerSectionTotal;
        vm.lowerSectionTotal = lowerSectionTotal;
        vm.showGrandTotal = showGrandTotal;
        vm.grandTotal = grandTotal;
        vm.saveGame = saveGame;

        initialize();

        function rollingAllowed(){
            return rollsMade < 3;
        }

        function rollDices(){
            if(rollingAllowed()){
                turnStarted = true;
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
            if(turnStarted){
                dice.kept = true;
            }
        }

        function unkeepDice(dice){
            dice.kept = false;
        }

        function showScore(){
            return turnStarted;
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

        function playMove(moveName, score){
            if(turnStarted && !wasMovePlayed(moveName)){
                scoreSheet[moveName] = score;
                resetDices();
            }
        }

        function getMoveScore(moveName){
            if(wasMovePlayed(moveName)){
                return scoreSheet[moveName];
            }
            else{
                switch(moveName){
                    case 'ones':
                        return getDiceScore(1);
                    case 'twos':
                        return getDiceScore(2);
                    case 'threes':
                        return getDiceScore(3);
                    case 'fours':
                        return getDiceScore(4);
                    case 'fives':
                        return getDiceScore(5);
                    case 'sixes':
                        return getDiceScore(6);
                    case 'threeOfAKind':
                        return threeOfAKind();                    
                    case 'fourOfAKind':
                        return fourOfAKind();
                    case 'fullHouse':
                        return fullHouse();
                    case 'smallStraight':
                        return smallStraight();
                    case 'largeStraight':
                        return largeStraight();
                    case 'yahtzee':
                        return yahtzee();
                    case 'chance':
                        return getDicesTotalScore();
                }
            }
        }

        function wasMovePlayed(moveName){
            return scoreSheet[moveName] !== -1;
        }

        function showUpperSectionTotal(){
            var playedAllUpperSectionMove = (scoreSheet['ones'] !== -1 && scoreSheet['twos'] !== -1 && scoreSheet['threes'] !== -1 
                && scoreSheet['fours'] !== -1 && scoreSheet['fives'] !== -1 && scoreSheet['sixes'] !== -1);

            return playedAllUpperSectionMove;
        }

        function upperSectionTotal(){
            var upperSectionTotal = scoreSheet['ones'] + scoreSheet['twos'] + scoreSheet['threes'] 
                + scoreSheet['fours'] + scoreSheet['fives'] + scoreSheet['sixes'];

            return upperSectionTotal;
        }

        function upperSectionBonus(){
            return upperSectionTotal() >= 63 ? 35 : 0;
        }

        function upperSectionGrandTotal(){
            return upperSectionTotal() + upperSectionBonus();
        }

        function showLowerSectionTotal(){
            var playedAllLowerSectionMove = (scoreSheet['threeOfAKind'] !== -1 && scoreSheet['fourOfAKind'] !== -1 && scoreSheet['fullHouse'] !== -1 
                && scoreSheet['smallStraight'] !== -1 && scoreSheet['largeStraight'] !== -1 && scoreSheet['yahtzee'] !== -1 && scoreSheet['chance'] !== -1);

            return playedAllLowerSectionMove;
        }

        function lowerSectionTotal(){
            var lowerSectionTotal = scoreSheet['threeOfAKind'] + scoreSheet['fourOfAKind'] + scoreSheet['fullHouse'] 
                + scoreSheet['smallStraight'] + scoreSheet['largeStraight'] + scoreSheet['yahtzee'] + scoreSheet['chance'];

            return lowerSectionTotal;
        }

        function showGrandTotal(){
            return !_.some(scoreSheet, function(score){
                return score === -1;
            })
        }

        function grandTotal(){
            return upperSectionTotal() + lowerSectionTotal();
        }

        function saveGame(){
            serverApi.post('http://localhost:8080/api/saveYahtzee', {total: grandTotal(), bonus: upperSectionBonus()});
        }

        function initialize(){
            for (var i = 0; i < 5; i++) {
                vm.dices[i] = {value: i + 1, kept: false};
                assignClass(vm.dices[i]);
            }
        }

        function initializeScoreSheet(){
            return {
                ones: -1,
                twos: -1,
                threes: -1,
                fours: -1,
                fives: -1,
                sixes: -1,
                threeOfAKind: -1,
                fourOfAKind: -1,
                fullHouse: -1,
                smallStraight: -1,
                largeStraight: -1,
                yahtzee: -1,
                chance: -1
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
            turnStarted = false;
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