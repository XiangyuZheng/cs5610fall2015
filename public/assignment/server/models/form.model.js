module.exports = function (app) {
    var fs = require('fs');
    var forms = JSON.parse(fs.readFileSync('public/assignment/server/models/form.mock.json', 'utf8'));

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
        form.fields = [];
        forms.push(form);
        return form;
    }

    function findAllForms() {
        return forms;
    }

    function findFormById(id) {
        for (var index in forms) {
            if (forms[index].id == id) {
                return forms[index];
            }
        }
        return null;
    }

    function updateForm(id, form) {
        for (var index in forms) {
            if (forms[index].id == id) {
                forms[index].title = form.title;
                forms[index].userId = form.userId;
                forms[index].fields = form.fields;
                return forms[index];
            }
        }
        return null;
    }

    function deleteForm(id) {
        for (var index in forms) {
            if (forms[index].id == id) {
                forms.splice(index, 1);
                break;
            }
        }
        return null;
    }

    function findFormByTitle(title) {
        for (var index in forms) {
            if (forms[index].title == title) {
                return forms[index];
            }
        }
        return null;
    }

    function findFormsForUser(userId) {
        var result = [];
        for (var index in forms) {
            if (forms[index].userId == userId) {
                result.push(forms[index]);
            }
        }
        return result;
    }

    function getFieldsByFormId(id) {
        var form = findFormById(id);
        if (form == null) {
            return [];
        } else {
            return form.fields;
        }
    }

    function getField(formId, fieldId) {
        var form = findFormById(formId);
        if (form == null) {
            return null;
        } else {
            for (var index in form.fields) {
                if (form.fields[index].id == fieldId) {
                    return form.fields[index];
                }
            }
            return null;
        }
    }

    function removeField(formId, fieldId) {
        var form = findFormById(formId);
        if (form == null) {
            return [];
        } else {
            for (var index in form.fields) {
                if (form.fields[index].id == fieldId) {
                    form.fields.splice(index, 1);
                    break;
                }
            }
            return form.fields;
        }
    }

    function createField(formId, field) {
        var form = findFormById(formId);
        if (form == null) {
            return null;
        } else {
            form.fields.push(field);
            return field;
        }
    }

    function updateField(formId, fieldId, field) {
        var form = findFormById(formId);
        if (form == null) {
            return null;
        } else {
            for (var index in form.fields) {
                if (form.fields[index].id == fieldId) {
                    form.fields[index].label = field.label;
                    form.fields[index].type = field.type;
                    form.fields[index].placeholder = field.placeholder;
                    if (field.type == "OPTIONS") {
                        form.fields[index].options = field.options;
                    }
                    break;
                }
            }
            return form.fields;
        }
    }
};