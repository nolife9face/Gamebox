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
                rollsMade = 0;
                resetDices();
            }
        }

        function keepDice(dice){
            dice.kept = true;
        }

        function unkeepDice(dice){
            dice.kept = false;
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
            for (var i = 0; i < 5; i++) {
                vm.dices[i].kept = false;
            }
        }
    }
})();