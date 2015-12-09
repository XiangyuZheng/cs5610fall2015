(function () {
    "use strict";
    angular.module("MovieApp")
        .controller("AdminMovieController", AdminMovieController);

    function AdminMovieController($rootScope, MovieService) {
        var adminMovie = this;
        MovieService.getPopularMovies().then(function (movies) {
            if ($rootScope.user == null || $rootScope.user.username != "admin") {
                return;
            }
            adminMovie.movies = movies;
        });

        adminMovie.addMovie = function () {
            if ($rootScope.user == null || $rootScope.user.username != "admin") {
                alert("Action not allowed.");
                return;
            }
            var movie = {};
            movie.Name = adminMovie.Name;
            movie.Year = adminMovie.Year
            movie.ImageUrl = adminMovie.ImageUrl;
            movie.Rating = adminMovie.Rating;
            movie.Description = adminMovie.Description;
            movie.Director = adminMovie.Director;
            movie.Actors = adminMovie.Actors;
            movie.Genre = adminMovie.Genre;

            MovieService.createMovie(movie).then(createCallback);

            function createCallback(newMovie) {
                adminMovie.movies.push(newMovie);
                adminMovie.Id = "";
                adminMovie.Name = "";
                adminMovie.Year = "";
                adminMovie.ImageUrl = "";
                adminMovie.Rating = "";
                adminMovie.Description = "";
                adminMovie.Director = "";
                adminMovie.Actors = "";
                adminMovie.Genre = "";
            }
        }

        adminMovie.updateMovie = function () {
            if ($rootScope.user == null || $rootScope.user.username != "admin") {
                alert("Action not allowed.");
                return;
            }
            if (adminMovie.selected != null) {
                var movie = adminMovie.movies[adminMovie.selected];
                movie.Name = adminMovie.Name;
                movie.Year = adminMovie.Year
                movie.ImageUrl = adminMovie.ImageUrl;
                movie.Rating = adminMovie.Rating;
                movie.Description = adminMovie.Description;
                movie.Director = adminMovie.Director;
                movie.Actors = adminMovie.Actors;
                movie.Genre = adminMovie.Genre;

                MovieService.updateMovie(movie.Id, movie).then(updateCallback);
            }

            function updateCallback(m) {
                adminMovie.movies[adminMovie.selected] = m;
            }
        }

        adminMovie.deleteMovie = function (index) {
            if ($rootScope.user == null || $rootScope.user.username != "admin") {
                alert("Action not allowed.");
                return;
            }
            MovieService.deleteMovie(adminMovie.movies[index].Id).then(deleteCallback);

            function deleteCallback(response) {
                MovieService.getPopularMovies().then(function (movies) {
                    adminMovie.movies = movies;
                });
            }
        }

        adminMovie.selectMovie = function (index) {
            adminMovie.selected = index;
            adminMovie.Id = adminMovie.movies[index].Id;
            adminMovie.Name = adminMovie.movies[index].Name;
            adminMovie.Year = adminMovie.movies[index].Year;
            adminMovie.ImageUrl = adminMovie.movies[index].ImageUrl;
            adminMovie.Rating = adminMovie.movies[index].Rating;
            adminMovie.Description = adminMovie.movies[index].Description;
            adminMovie.Director = adminMovie.movies[index].Director;
            adminMovie.Actors = adminMovie.movies[index].Actors;
            adminMovie.Genre = adminMovie.movies[index].Genre;
        }
    }
})();