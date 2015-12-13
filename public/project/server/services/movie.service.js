module.exports = function (app, movieModel, db) {

    var uuid = require('node-uuid');

    app.get("/api/project/movie/latest", function (req, res) {
        movieModel.getLastestMovies().then(callback);

        function callback(response) {
            res.json(response);
        }
    });

    app.get("/api/project/movie/popular", function (req, res) {
        movieModel.getPopularMovies().then(callback);

        function callback(response) {
            res.json(response);
        }
    });

    app.get("/api/project/movie/admin", function (req, res) {
        movieModel.getMoviesForAdmin().then(callback);

        function callback(response) {
            res.json(response);
        }
    });

    app.get("/api/project/movie/id/:movieId", function (req, res) {
        var movieId = req.params["movieId"];
        movieModel.getMovieById(movieId).then(callback);

        function callback(response) {
            res.json(response);
        }
    });

    app.get("/api/project/movie/search/:term", function (req, res) {
        var term = req.params["term"];
        movieModel.getSearchResultByTerm(term).then(callback);

        function callback(response) {
            res.json(response);
        }
    });

    app.post("/api/project/movie", function (req, res) {
        var movie = req.body;
        movie.Id = uuid.v1();
        movieModel.createMovie(movie).then(callback);

        function callback(response) {
            res.json(response);
        }
    });

    app.put("/api/project/movie/:id", function (req, res) {
        var id = req.params["id"];
        var movie = req.body;
        movieModel.updateMovie(id, movie).then(callback);

        function callback(response) {
            res.json(response);
        }
    });

    app.delete("/api/project/movie/:id", function (req, res) {
        var id = req.params["id"];
        movieModel.deleteMovie(id).then(callback);

        function callback(response) {
            res.json(response);
        }
    });

    app.get("/api/project/movie/filter/:year/:genre/:rating", function (req, res) {
        var year = req.param["year"];
        var genre = req.param["genre"];
        var rating = req.param["rating"];
        console.log(year);
        movieModel.getFilteredMovies(year, genre, rating).then(callback);

        function callback(response) {
            res.json(response);
        }
    });
};