module.exports = function (app, formModel, db) {

    var uuid = require('node-uuid');
    
    app.get("/api/assignment/user/:userId/form", function (req, res) {
        var userId = req.params["userId"];
        var response = formModel.findFormsForUser(userId);
        res.json(response);
    });

    app.get("/api/assignment/form/:formId", function (req, res) {
        var formId = req.params["formId"];
        var response = formModel.findFormById(formId);
        res.json(response);
    });

    app.delete("/api/assignment/form/:formId", function (req, res) {
        var formId = req.params["formId"];
        var response = formModel.deleteForm(formId);
        res.json(response);
    });
    
    app.post("/api/assignment/user/:userId/form", function (req, res) {
        var userId = req.params["userId"];
        var form = req.body;
        form.userId = userId;
        form.id = uuid.v1();
        var response = formModel.createForm(form);
        res.json(response);
    });

    app.put("/api/assignment/form/:formId", function (req, res) {
        var formId = req.params["formId"];
        var form = req.body;
        var response = formModel.updateForm(formId, form);
        res.json(response);
    });
};