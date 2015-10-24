(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {
        if ($rootScope.user != null) {
            var currentUser = $rootScope.user;
            $scope.username = currentUser.username;
            $scope.password = currentUser.password;
            $scope.firstname = currentUser.firstname;
            $scope.lastname = currentUser.lastname;
            $scope.email = currentUser.email;
        }
        $scope.update = function () {
            var newUser = {};
            newUser.username = $scope.username;
            newUser.password = $scope.password;
            newUser.firstname = $scope.firstname;
            newUser.lastname = $scope.lastname;
            newUser.email = $scope.email;
            UserService.updateUser(currentUser.id, newUser, callback);
        }

        function callback(user) {
            $rootScope.user = user;
        }
    }
})();