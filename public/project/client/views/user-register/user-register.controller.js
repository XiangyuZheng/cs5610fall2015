(function () {
    "use strict";
    angular.module("MovieApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        var register = this;
        register.register = function() {
            var user = {};
            user.username = register.username;
            user.password = register.password;
            user.email = register.email;
            UserService.createUser(user, callback).then(callback);
        }
        
        function callback(user) {
            if (user != null) {
                $rootScope.user = user;
                $location.path("/home");
            }
        }
    }
})();