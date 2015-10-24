(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {
        $scope.login = function() {
            UserService.findUserByUsernameAndPassword($scope.username, $scope.password, callback);
        }
        
        function callback(user) {
            if (user != null) {
                $rootScope.user = user;
                $location.path("/profile");
            } else {
                alert("Username and Password don't match.")
            }
        }
    }
})();