(function () {
    "use strict";
    angular.module("MovieApp")
        .controller("MovieInfoController", MovieInfoController);

    function MovieInfoController($rootScope, $routeParams, MovieService) {
        var movieInfo = this;
        var movieId = $routeParams.movieId;
        MovieService.getMovieById(movieId).then(function (movie) {
            movieInfo.movie = movie;
        });
    }
})();