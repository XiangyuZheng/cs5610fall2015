module.exports = function (app, mongoose, ReviewSchema) {
    var Q = require('q');
    var ReviewModel = mongoose.model("movie.review", ReviewSchema);

    var api = {
        createReview: createReview,
        getReviewForMovie: getReviewForMovie
    }
    return api;

    function createReview(review) {
        var deferred = Q.defer();
        ReviewModel.create({
            id: review.id,
            movieId: review.movieId,
            user: review.user,
            content: review.content,
            time: Date.now()
        }, function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function getReviewForMovie(mid) {
        var deferred = Q.defer();
        ReviewModel.find({
            movieId: mid
        }).exec(function (err, result) {
            var fakeReview = {
                id: 0,
                content: 'This is a great movie! This is a fake review that appears under every movie.',
                user: {
                    id: 3456,
                    firstName: "sam",
                    lastName: "zheng",
                    username: "sam",
                    password: "123"
                },
                time: "2015-12-12T02:21:15.377Z"
            };
            result.push(fakeReview);
            deferred.resolve(result);
        });
        return deferred.promise;
    }
};