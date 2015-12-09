module.exports = function (app, mongoose, db) {

    // Schema

    var movieSchemaModule = require("./models/movie.schema.js");
    var movieSchema = new movieSchemaModule(mongoose);

    var userSchemaModule = require("./models/user.schema.js");
    var userSchema = new userSchemaModule(mongoose, movieSchema);

    // Model

    var userModelModule = require("./models/user.model.js");
    var userModel = new userModelModule(app, mongoose, userSchema);

    var movieModelModule = require("./models/movie.model.js");
    var movieModel = new movieModelModule(app, mongoose, movieSchema);

    // Service

    var userServiceModule = require("./services/user.service.js");
    var userService = new userServiceModule(app, userModel, null);

    var movieServiceModule = require("./services/movie.service.js");
    var movieService = new movieServiceModule(app, movieModel, null);
};