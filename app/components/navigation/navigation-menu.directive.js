(function() {
    'use strict';

    angular
        .module('app.navigation')
        .directive('navigationMenu', navigationMenu);

    navigationMenu.$inject = ['navigationApi'];

    function navigationMenu(navigationApi) {
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'components/navigation/navigation-menu.html',
            scope: {
            }
        };
        return directive;
        
        function link(scope, element, attrs) {
            scope.gameList = initializeGameList();

            scope.loadGame = loadGame;

            function loadGame(location){
                navigationApi.currentPage = location;
            }

            /**
             * Initialize the game list. 
             */
            function initializeGameList(){
                return [{
                    name: 'Yahtzee',
                    location: '../app/components/games/yahtzee/yahtzee.html',
                    faClass: 'fa-y-combinator'
                }]
            }
        }
    }
})();