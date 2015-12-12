(function () {
    "use strict";
    angular.module("MovieApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http, $q) {

        var service = {
            "createReview": createReview,
            "getReviewForMovie": getReviewForMovie
        }

        return service;

        function createReview(review) {
            var deferred = $q.defer();
            $http.post("/api/project/review", review)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getReviewForMovie(mid) {
            var deferred = $q.defer();
            $http.get("/api/project/movie/review/" + mid)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();