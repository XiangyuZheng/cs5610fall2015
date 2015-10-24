(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {
        $scope.register = function() {
            var user = {};
            user.username = $scope.username;
            user.password = $scope.password;
            user.email = $scope.email;
            UserService.createUser(user, callback);
        }
        
        function callback(user) {
            if (user != null) {
                $rootScope.user = user;
                $location.path("/profile");
            }
        }
    }
})();