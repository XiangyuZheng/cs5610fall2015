(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [];

        var service = {
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findAllUsers": findAllUsers,
            "createUser": createUser,
            "deleteUserById": deleteUserById,
            "updateUser": updateUser
        }

        return service;

        function findUserByUsernameAndPassword(username, password, callback) {
            for (var index in users) {
                if (users[index].username == username && users[index].password == password) {
                    callback(users[index]);
                    return;
                }
            }
            callback.call(null);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            user.id = guid();
            users.push(user);
            callback(user);
        }

        function deleteUserById(id, callback) {
            for (var index in users) {
                if (users[index].id == id) {
                    users.splice(index, 1);
                    break;
                }
            }
            callback(users);
        }

        function updateUser(id, user, callback) {
            for (var index in users) {
                if (users[index].id == id) {
                    users[index] = user;
                    callback(users[index]);
                    return;
                }
            }
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }
})();