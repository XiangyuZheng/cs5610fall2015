(function () {
    "use strict";
    angular.module("MovieApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $routeParams, UserService) {
        var profile = this;
        profile.user = $rootScope.user;

        profile.update = function () {
            var newUser = {};
            newUser.username = profile.user.username;
            newUser.password = profile.user.password;
            newUser.firstName = profile.user.firstName;
            newUser.lastName = profile.user.lastName;
            newUser.email = profile.user.email;
            newUser.likedMovies = profile.user.likedMovies;
            UserService.updateUser(profile.user.id, newUser).then(callback);
        };

        function callback(user) {
            $rootScope.user = user;
            profile.user = user;
        }
    }
})();