(function() {
'use strict';

    angular
        .module('shared.dialog-api')
        .service('dialogApi', dialogApi);

    dialogApi.inject = ['$mdDialog'];

    function dialogApi($mdDialog) {
        var vm = this;

        vm.confirm = confirm;

        function confirm(title, textContent, ariaLabel, yes, no){
            var confirm = $mdDialog.confirm()
            .title(title)
            .textContent(textContent)
            .ariaLabel(ariaLabel)
            .ok(yes)
            .cancel(no);

            return $mdDialog.show(confirm);
        }
    }
})();