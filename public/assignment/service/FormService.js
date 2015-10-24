(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];

        var service = {
            "createFormForUser": createFormForUser,
            "findAllFormsForUser": findAllFormsForUser,
            "deleteFormById": deleteFormById,
            "updateFormById": updateFormById
        }

        return service;

        function createFormForUser(userId, form, callback) {
            form.id = guid();
            form.userid = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var result = [];
            for (var index in forms) {
                if (forms[index].userid == userId) {
                    result.push(forms[index]);
                }
            }
            callback(result);
        }

        function deleteFormById(formId, callback) {
            for (var index in forms) {
                if (forms[index].id == formId) {
                    forms.splice(index, 1);
                    callback(forms);
                    return;
                }
            }
        }

        function updateFormById(formId, newForm, callback) {
            for (var index in forms) {
                if (forms[index].id == formId) {
                    forms[index] = newForm;
                    callback(forms[index]);
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