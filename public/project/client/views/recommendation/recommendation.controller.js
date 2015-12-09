(function () {
    "use strict";
    angular.module("MovieApp")
        .controller("RecommendationController", RecommendationController);

    function RecommendationController($rootScope, MovieService) {
        var recom = this;
        MovieService.getPopularMovies().then(function (results) {
            recom.movies = results;
        });
    }
})();