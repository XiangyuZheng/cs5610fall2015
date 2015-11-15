module.exports = function (app, userModel, db) {

    var uuid = require('node-uuid');
    
    app.post("/api/assignment/user", function (req, res) {
        var user = req.body;
        user.id = uuid.v1();
        var response = userModel.createUser(user);
        res.json(response);
    });

    app.get("/api/assignment/user", function (req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username != null && password != null) {
            var credentials = {
                username: username,
                password: password
            };
            var response = userModel.findUserByCredentials(credentials);
            res.json(response);
        } else if (username != null) {
            var response = userModel.findUserByUsername(username);
            res.json(response);
        } else {
            var response = userModel.findAllUsers();
            res.json(response);
        }
    });

    app.get("/api/assignment/user/:id", function (req, res) {
        var id = req.params["id"];
        var response = userModel.findUserById(id);
        res.json(response);
    });

    app.put("/api/assignment/user/:id", function (req, res) {
        var id = req.params["id"];
        var user = req.body;
        var response = userModel.updateUser(id, user);
        res.json(response);
    });

    app.delete("/api/assignment/user/:id", function (req, res) {
        var id = req.params["id"];
        var response = userModel.deleteUser(id);
        res.json(response);
    });
};