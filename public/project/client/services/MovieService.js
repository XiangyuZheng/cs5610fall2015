(function () {
    "use strict";
    angular.module("MovieApp")
        .factory("MovieService", MovieService);

    function MovieService($http, $q) {

        var service = {
            "getLastestMovies": getLastestMovies,
            "getPopularMovies": getPopularMovies,
            "getMovieById": getMovieById,
            "getSearchResultByTerm": getSearchResultByTerm,
            "createMovie": createMovie,
            "updateMovie": updateMovie,
            "deleteMovie": deleteMovie,
            "getFilteredMovies": getFilteredMovies,
            "getMoviesForAdmin": getMoviesForAdmin
        }

        return service;

        function getLastestMovies() {
            var deferred = $q.defer();
            $http.get("/api/project/movie/latest")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getPopularMovies() {
            var deferred = $q.defer();
            $http.get("/api/project/movie/popular")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
        
        function getMoviesForAdmin() {
            var deferred = $q.defer();
            $http.get("/api/project/movie/admin")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getMovieById(movieId) {
            var deferred = $q.defer();
            $http.get("/api/project/movie/id/" + movieId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getSearchResultByTerm(term) {
            var deferred = $q.defer();
            $http.get("/api/project/movie/search/" + term)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createMovie(movie) {
            var deferred = $q.defer();
            $http.post("/api/project/movie", movie)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteMovie(id) {
            var deferred = $q.defer();
            $http.delete("/api/project/movie/" + id)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateMovie(id, movie) {
            var deferred = $q.defer();
            $http.put("/api/project/movie/" + id, movie)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
        
        function getFilteredMovies(year, genre, rating) {
            var deferred = $q.defer();
            $http.get("/api/project/movie/filter/2015/Action/5.5" + year + "/" + genre + "/" + rating)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();