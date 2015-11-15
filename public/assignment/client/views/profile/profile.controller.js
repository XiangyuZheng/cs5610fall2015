(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {
        if ($rootScope.user != null) {
            var currentUser = $rootScope.user;
            $scope.username = currentUser.username;
            $scope.password = currentUser.password;
            $scope.firstName = currentUser.firstName;
            $scope.lastName = currentUser.lastName;
            $scope.email = currentUser.email;
        }
        $scope.update = function () {
            var newUser = {};
            newUser.username = $scope.username;
            newUser.password = $scope.password;
            newUser.firstName = $scope.firstName;
            newUser.lastName = $scope.lastName;
            newUser.email = $scope.email;
            UserService.updateUser(currentUser.id, newUser).then(callback);
        }

        function callback(user) {
            $rootScope.user = user;
        }
    }
})();