(function() {
    'use strict';

    angular
        .module('app.navigation')
        .directive('navigationMenu', navigationMenu);

    function navigationMenu() {
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

            /**
             * Initialize the game list. 
             */
            function initializeGameList(){
                return [{
                    name: 'Yatzhee',
                    faClass: 'fa-y-combinator'
                }]
            }
        }
    }
})();