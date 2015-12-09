(function () {
    "use strict";
    angular.module("MovieApp", ["ngRoute"]);

    angular.module("MovieApp")
        .controller("BodyController", BodyController);

    function BodyController($location) {
        var bodyController = this;
        bodyController.isHomePage = function () {
            return $location.path() === '/home' || $location.path() === '/';
        }
    }
})();