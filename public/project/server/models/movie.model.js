module.exports = function (app, mongoose, MovieSchema) {
    var Q = require('q');
    var MovieModel = mongoose.model("movie.info", MovieSchema);

    var api = {
        getLastestMovies: getLastestMovies,
        getPopularMovies: getPopularMovies,
        getMovieById: getMovieById,
        getSearchResultByTerm: getSearchResultByTerm,
        createMovie: createMovie,
        updateMovie: updateMovie,
        deleteMovie: deleteMovie,
        getRecommendedMovies: getRecommendedMovies,
        getFilteredMovies: getFilteredMovies,
        getMoviesForAdmin: getMoviesForAdmin
    }
    return api;

    function getLastestMovies() {
        var deferred = Q.defer();
        MovieModel.find({
            Year: 2015
        }).skip(random(0, 50)).limit(4).exec(function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function getPopularMovies() {
        var deferred = Q.defer();
        MovieModel.find().skip(random(0, 100)).limit(16).exec(function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function getMovieById(id) {
        var deferred = Q.defer();
        MovieModel.find({
            Id: id
        }, function (err, result) {
            if (result.length == 0) {
                deferred.resolve(null);
            } else {
                deferred.resolve(result[0]);
            }
        });
        return deferred.promise;
    }

    function getSearchResultByTerm(term) {
        var deferred = Q.defer();
        var regex = new RegExp('.*' + term + '.*', 'i');
        MovieModel.find({
            Name: regex
        }).limit(12).exec(function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function createMovie(movie) {
        var deferred = Q.defer();
        MovieModel.create({
            Id: movie.Id,
            Name: movie.Name,
            Year: movie.Year,
            ImageUrl: movie.ImageUrl,
            Rating: movie.Rating,
            Description: movie.Description,
            Director: movie.Director,
            Actors: movie.Actors,
            Genre: movie.Genre
        }, function (err, result) {
            deferred.resolve(movie);
        });
        return deferred.promise;
    }

    function updateMovie(id, movie) {
        var deferred = Q.defer();
        movie.Id = id;
        MovieModel.findOneAndUpdate({
            Id: id
        }, {
            Name: movie.Name,
            Year: movie.Year,
            ImageUrl: movie.ImageUrl,
            Rating: movie.Rating,
            Description: movie.Description,
            Director: movie.Director,
            Actors: movie.Actors,
            Genre: movie.Genre
        }, function (err, result) {
            deferred.resolve(movie);
        });
        return deferred.promise;
    }

    function deleteMovie(id) {
        var deferred = Q.defer();
        MovieModel.remove({
            Id: id
        }, function (err, result) {
            deferred.resolve(null);
        });
        return deferred.promise;
    }

    function getRecommendedMovies() {

    }

    function getFilteredMovies(year, genre, rating) {
        var deferred = Q.defer();
        var yearRegex = new RegExp(year + '.*', 'i');
        var genreRegex = new RegExp('.*' + genre + '.*', 'i');
        MovieModel.find({
            Year: yearRegex,
            Genre: genreRegex,
            Rating: {
                $gt: rating
            }
        }).limit(16).exec(function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function getMoviesForAdmin() {
        var deferred = Q.defer();
        MovieModel.find().limit(20).exec(function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function random(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }
};