(function () {
    "use strict";
    angular.module("MovieApp")
        .controller("RecomChooseController", RecomChooseController);

    function RecomChooseController($rootScope, $location, MovieService) {
        var recomChoose = this;
        MovieService.getPopularMovies().then(function(movies){
            recomChoose.movies = movies;
        });
        
        recomChoose.recom = function() {
            $location.path("/recommendation");
        }
    }
})();