(function () {
    "use strict";
    angular.module("MovieApp")
        .controller("HomeController", HomeController);

    function HomeController($rootScope, $location, MovieService) {
        var home = this;
        MovieService.getLastestMovies().then(function (results) {
            home.latestMovies = results;
        });
    }
})();