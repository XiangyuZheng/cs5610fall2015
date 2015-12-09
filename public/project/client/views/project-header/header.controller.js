(function () {
    "use strict";
    angular.module("MovieApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($window, $rootScope, $scope, $location) {
        var header = this;
        header.$location = $location;
        header.search = function (term) {
            $location.path("/search/" + term);
        };
        header.register = function () {
            $location.path("/register");
        };
        header.login = function () {
            $location.path("/login");
        };
        header.logout = function () {
            $window.location.reload();
        };
        $scope.$on('$viewContentLoaded', function() {
            $scope.user = $rootScope.user;
        });
    }
})();