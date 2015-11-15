module.exports = function (app, formModel, db) {
    
    var uuid = require('node-uuid');
    
    app.get("/api/assignment/form/:formId/field", function (req, res) {
        var formId = req.params["formId"];
        var response = formModel.getFieldsByFormId(formId);
        res.json(response);
    });

    app.get("/api/assignment/form/:formId/field/:fieldId", function (req, res) {
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];
        var response = formModel.getField(formId, fieldId);
        res.json(response);
    });

    app.delete("/api/assignment/form/:formId/field/:fieldId", function (req, res) {
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];
        var response = formModel.removeField(formId, fieldId);
        res.json(response);
    });
    
    app.post("/api/assignment/form/:formId/field", function (req, res) {
        var formId = req.params["formId"];
        var field = req.body;
        field.id = uuid.v1();
        var response = formModel.createField(formId, field);
        res.json(response);
    });

    app.put("/api/assignment/form/:formId/field/:fieldId", function (req, res) {
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];
        var field = req.body;
        var response = formModel.updateField(formId, fieldId, field);
        res.json(response);
    });
};