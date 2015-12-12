(function () {
    "use strict";
    angular.module("MovieApp")
        .controller("MovieInfoController", MovieInfoController);

    function MovieInfoController($rootScope, $routeParams, MovieService, ReviewService) {
        var movieInfo = this;
        var movieId = $routeParams.movieId;
        movieInfo.user = $rootScope.user;
        MovieService.getMovieById(movieId).then(function (movie) {
            movieInfo.movie = movie;
        });

        ReviewService.getReviewForMovie(movieId).then(function (reviews) {
            movieInfo.reviews = reviews;
            console.log(reviews);
        });

        movieInfo.create = function () {
            if (movieInfo.content == "") {
                alert("Review content can't be empty.");
                return;
            }
            if (movieInfo.user == null) {
                alert("Please login before writing reviews.");
                return;
            }
            var review = {};
            review.movieId = movieId;
            review.user = movieInfo.user;
            review.content = movieInfo.content;
            ReviewService.createReview(review).then(function (result) {
                movieInfo.content = "";
                ReviewService.getReviewForMovie(movieId).then(function (reviews) {
                    movieInfo.reviews = reviews;
                });
            });
        };
    }
})();