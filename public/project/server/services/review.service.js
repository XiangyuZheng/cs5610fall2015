module.exports = function (app, reviewModel, db) {

    var uuid = require('node-uuid');

    app.post("/api/project/review", function (req, res) {
        var review = req.body;
        review.Id = uuid.v1();
        reviewModel.createReview(review).then(callback);

        function callback(response) {
            res.json(response);
        }
    });

    app.get("/api/project/movie/review/:movieId", function (req, res) {
        var movieId = req.params["movieId"];
        reviewModel.getReviewForMovie(movieId).then(callback);

        function callback(response) {
            res.json(response);
        }
    });
};