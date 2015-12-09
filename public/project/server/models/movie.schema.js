module.exports = function (mongoose) {
    var MovieSchema = new mongoose.Schema({
        Id: Number,
        Name: String,
        Year: Number,
        ImageUrl: String,
        Rating: Number,
        Description: String,
        Director: String,
        Actors: String,
        Genre: String
    }, {collection: "movie.info"});
    return MovieSchema;
}