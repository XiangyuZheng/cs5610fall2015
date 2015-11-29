module.exports = function (app, mongoose, FormSchema) {
    var Q = require('q');
    var fs = require('fs');
    var forms = JSON.parse(fs.readFileSync('public/assignment/server/models/form.mock.json', 'utf8'));
    var FormModel = mongoose.model("cs5610.assignment.form", FormSchema);

    // Removes all data in FormSchema
    FormModel.remove(function (err, result) {});
    // Inserts form data
    for (var i in forms) {
        createForm(forms[i]);
    }

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormsForUser: findFormsForUser,
        getFieldsByFormId: getFieldsByFormId,
        getField: getField,
        removeField: removeField,
        createField: createField,
        updateField: updateField
    }
    return api;

    function createForm(form) {
        var deferred = Q.defer();
        FormModel.create({
            id: form.id,
            title: form.title,
            userId: form.userId,
            fields: form.fields
        }, function (err, result) {
            deferred.resolve(form);
        });
        return deferred.promise;
    }

    function findAllForms() {
        var deferred = Q.defer();
        FormModel.find(function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function findFormById(id) {
        var deferred = Q.defer();
        FormModel.find({
            id: id
        }, function (err, result) {
            if (result.length == 0) {
                deferred.resolve(null);
            } else {
                deferred.resolve(result[0]);
            }
        });
        return deferred.promise;
    }

    function updateForm(id, form) {
        var deferred = Q.defer();
        FormModel.findOneAndUpdate({
            id: id
        }, {
            title: form.title,
            userId: form.userId,
            fields: form.fields
        }, function (err, result) {
            deferred.resolve(form);
        });
        return deferred.promise;
    }

    function deleteForm(id) {
        var deferred = Q.defer();
        FormModel.remove({
            id: id
        }, function (err, result) {
            deferred.resolve(null);
        });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = Q.defer();
        FormModel.find({
            title: title
        }, function (err, result) {
            if (result.length == 0) {
                deferred.resolve(null);
            } else {
                deferred.resolve(result[0]);
            }
        });
        return deferred.promise;
    }

    function findFormsForUser(userId) {
        var deferred = Q.defer();
        FormModel.find({
            userId: userId
        }, function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function getFieldsByFormId(id) {
        var deferred = Q.defer();
        findFormById(id).then(function (form) {
            if (form == null) {
                deferred.resolve([]);
            } else {
                deferred.resolve(form.fields);
            }
        });
        return deferred.promise;
    }

    function getField(formId, fieldId) {
        var deferred = Q.defer();
        findFormById(formId).then(function (form) {
            if (form == null) {
                deferred.resolve(null);
            } else {
                for (var index in form.fields) {
                    if (form.fields[index].id == fieldId) {
                        deferred.resolve(form.fields[index]);
                    }
                }
                deferred.resolve(null);
            }
        });
        return deferred.promise;
    }

    function removeField(formId, fieldId) {
        var deferred = Q.defer();
        findFormById(formId).then(function (form) {
            if (form == null) {
                deferred.resolve([]);
            } else {
                for (var index in form.fields) {
                    if (form.fields[index].id == fieldId) {
                        form.fields.splice(index, 1);
                        break;
                    }
                }
                updateForm(formId, form);
                deferred.resolve(form.fields);
            }
        });
        return deferred.promise;
    }

    function createField(formId, field) {
        var deferred = Q.defer();
        findFormById(formId).then(function (form) {
            if (form == null) {
                deferred.resolve(null);
            } else {
                form.fields.push(field);
                updateForm(formId, form);
                deferred.resolve(field);
            }
        });
        return deferred.promise;
    }

    function updateField(formId, fieldId, field) {
        var deferred = Q.defer();
        findFormById(formId).then(function (form) {
            if (form == null) {
                deferred.resolve(null);
            } else {
                for (var index in form.fields) {
                    if (form.fields[index].id == fieldId) {
                        form.fields[index].label = field.label;
                        form.fields[index].fieldType = field.fieldType;
                        form.fields[index].placeholder = field.placeholder;
                        if (field.fieldType == "OPTIONS") {
                            form.fields[index].options = field.options;
                        }
                        break;
                    }
                }
                updateForm(formId, form);
                deferred.resolve(form.fields);
            }
        });
        return deferred.promise;
    }
};