(function () {
    "use strict";
    angular.module("MovieApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var login = this;
        login.login = function () {
            UserService.findUserByUsernameAndPassword(login.username, login.password).then(function (user) {
                if (user != null) {
                    $rootScope.user = user;
                    console.log($rootScope.user);
                    $location.path("/home");
                } else {
                    alert("Username and Password don't match.")
                }
            });
        }
    }
})();