module.exports = function (app, mongoose, UserSchema) {
    var Q = require('q');
    var fs = require('fs');
    var users = JSON.parse(fs.readFileSync('public/assignment/server/models/user.mock.json', 'utf8'));
    var UserModel = mongoose.model("cs5610.assignment.user", UserSchema);

    // Removes all data in UserModel
    UserModel.remove(function (err, result) {});
    // Inserts user data
    for (var i in users) {
        createUser(users[i]);
    }

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    }
    return api;

    function createUser(user) {
        var deferred = Q.defer();
        UserModel.create({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            email: user.email
        }, function (err, result) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = Q.defer();
        UserModel.find(function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = Q.defer();
        UserModel.find({
            id: user.id
        }, function (err, result) {
            if (result.length == 0) {
                deferred.resolve(null);
            } else {
                deferred.resolve(result[0]);
            }
        });
        return deferred.promise;
    }

    function updateUser(id, user) {
        var deferred = Q.defer();
        user.id = id;
        UserModel.findOneAndUpdate({
            id: id
        }, {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            email: user.email
        }, function (err, result) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function deleteUser(id) {
        var deferred = Q.defer();
        UserModel.remove({
            id: user.id
        }, function (err, result) {
            UserModel.find(function (err, result) {
                deferred.resolve(null);
            });
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = Q.defer();
        UserModel.find({
            username: username
        }, function (err, result) {
            console.log(result);
            if (result.length == 0) {
                deferred.resolve(null);
            } else {
                deferred.resolve(result[0]);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = Q.defer();
        UserModel.find({
            username: credentials.username,
            password: credentials.password
        }, function (err, result) {
            if (result.length == 0) {
                deferred.resolve(null);
            } else {
                deferred.resolve(result[0]);
            }
        });
        return deferred.promise;
    }
};