(function(){
    'use strict';

    /**
	* app Module
	*
	* Gamebox application
	*/
    angular
        .module('app', [
            //EXTERNAL DEPENDENCIES
            'ngMaterial',
            //SUBMODULE
            'app.home',
            'app.navigation',
            'app.games',
            'app.shared'
        ]);

}());