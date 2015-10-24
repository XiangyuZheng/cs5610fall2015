(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $scope, $location, FormService) {
        var currentUser = $rootScope.user;
        if (currentUser != null) {
            FormService.findAllFormsForUser(currentUser.id, callback);
        }

        function callback(forms) {
            $scope.forms = forms;
        }

        $scope.addForm = function () {
            if (currentUser == null) {
                alert("please login first.");
                return;
            }
            var name = $scope.name;
            var form = {};
            form.name = name;
            FormService.createFormForUser(currentUser.id, form, createCallback);

            function createCallback(newForm) {
                $scope.forms.push(newForm);
                $scope.name = "";
            }
        }

        $scope.updateForm = function () {}
        $scope.deleteForm = function (index) {
            FormService.deleteFormById($scope.forms[index].id, deleteCallback);

            function deleteCallback(forms) {
                $scope.forms = forms;
            }
        }
        $scope.selectForm = function (index) {}
    }
})();