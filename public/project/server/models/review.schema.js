module.exports = function (mongoose, UserSchema) {
    var ReviewSchema = new mongoose.Schema({
        id: String,
        movieId: Number,
        user: UserSchema,
        content: String,
        time: Date
    }, {collection: "movie.review"});
    return ReviewSchema;
}