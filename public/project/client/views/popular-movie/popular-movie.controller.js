(function () {
    "use strict";
    angular.module("MovieApp")
        .controller("PopularMovieController", PopularMovieController);

    function PopularMovieController($rootScope, MovieService) {
        var popMovie = this;
        MovieService.getPopularMovies().then(function (results) {
            popMovie.popMovies = results;
        });
    }
})();