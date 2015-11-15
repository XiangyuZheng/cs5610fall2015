module.exports = function (app) {
    var fs = require('fs');
    var users = JSON.parse(fs.readFileSync('public/assignment/server/models/user.mock.json', 'utf8'));

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
        users.push(user);
        return user;
    }

    function findAllUsers() {
        return users;
    }

    function findUserById(id) {
        for (var index in users) {
            if (users[index].id == id) {
                return users[index];
            }
        }
        return null;
    }

    function updateUser(id, user) {
        for (var index in users) {
            if (users[index].id == id) {
                users[index].firstName = user.firstName;
                users[index].lastName = user.lastName;
                users[index].username = user.username;
                users[index].password = user.password;
                users[index].email = user.email;
                return users[index];
            }
        }
        return null;
    }

    function deleteUser(id) {
        for (var index in users) {
            if (users[index].id == id) {
                users.splice(index, 1);
                break;
            }
        }
        return users;
    }

    function findUserByUsername(username) {
        for (var index in users) {
            if (users[index].username == username) {
                return users[index];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var index in users) {
            if (users[index].username == credentials.username && users[index].password == credentials.password) {
                return users[index];
            }
        }
        return null;
    }
};