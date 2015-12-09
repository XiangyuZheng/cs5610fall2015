(function () {
    "use strict";
    angular.module("MovieApp")
        .controller("AdminUserInfoController", AdminUserInfoController);

    function AdminUserInfoController($rootScope, UserService) {
        var adminUserInfo = this;
        UserService.findAllUsers().then(function (users) {
            if ($rootScope.user == null || $rootScope.user.username != "admin") {
                return;
            }
            adminUserInfo.users = users;
        });

        adminUserInfo.addUser = function () {
            if ($rootScope.user == null || $rootScope.user.username != "admin") {
                alert("Action not allowed.");
                return;
            }
            var user = {};
            user.username = adminUserInfo.username;
            user.firstName = adminUserInfo.firstName;
            user.lastName = adminUserInfo.lastName;
            user.email = adminUserInfo.email;
            user.likedMovies = [];

            UserService.createUser(user).then(createCallback);

            function createCallback(newUser) {
                adminUserInfo.users.push(newUser);
                adminUserInfo.id = "";
                adminUserInfo.username = "";
                adminUserInfo.firstName = "";
                adminUserInfo.lastName = "";
                adminUserInfo.email = "";
            }
        }

        adminUserInfo.updateUser = function () {
            if ($rootScope.user == null || $rootScope.user.username != "admin") {
                alert("Action not allowed.");
                return;
            }
            if (adminUserInfo.selected != null) {
                var user = adminUserInfo.users[adminUserInfo.selected];
                user.username = adminUserInfo.username;
                user.firstName = adminUserInfo.firstName;
                user.lastName = adminUserInfo.lastName;
                user.email = adminUserInfo.email;

                UserService.updateUser(user.id, user).then(updateCallback);
            }

            function updateCallback(user) {
                adminUserInfo.users[adminUserInfo.selected] = user;
            }
        }

        adminUserInfo.deleteUser = function (index) {
            if ($rootScope.user == null || $rootScope.user.username != "admin") {
                alert("Action not allowed.");
                return;
            }
            UserService.deleteUserById(adminUserInfo.users[index].id).then(deleteCallback);

            function deleteCallback(response) {
                UserService.findAllUsers().then(function (users) {
                    adminUserInfo.users = users;
                });
            }
        }

        adminUserInfo.selectUser = function (index) {
            adminUserInfo.selected = index;
            adminUserInfo.id = adminUserInfo.users[index].id;
            adminUserInfo.username = adminUserInfo.users[index].username;
            adminUserInfo.firstName = adminUserInfo.users[index].firstName;
            adminUserInfo.lastName = adminUserInfo.users[index].lastName;
            adminUserInfo.email = adminUserInfo.users[index].email;
        }
    }
})();