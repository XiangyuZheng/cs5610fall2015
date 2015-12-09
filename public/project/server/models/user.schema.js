module.exports = function (mongoose, movieSchema) {
    var UserSchema = new mongoose.Schema({
        id: String,
        firstName: {type: String, default: ""},
        lastName: {type: String, default: ""},
        username: String,
        password: String,
        email: {type: String, default: ""},
        likedMovies : {type: [movieSchema], default: []}
    }, {collection: "movie.user"});
    return UserSchema;
}