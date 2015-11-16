(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $scope, $location, FormService) {
        var currentUser = $rootScope.user;
        if (currentUser != null) {
            FormService.findAllFormsForUser(currentUser.id).then(callback);
            $scope.userId = currentUser.id;
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
            form.title = name;
            FormService.createFormForUser(currentUser.id, form).then(createCallback);

            function createCallback(newForm) {
                $scope.forms.push(newForm);
                $scope.name = "";
            }
        }

        $scope.updateForm = function () {
            if ($scope.selected != null) {
                $scope.forms[$scope.selected].title = $scope.name;
                FormService.updateFormById($scope.forms[$scope.selected].id, $scope.forms[$scope.selected])
                    .then(updateCallback);
            }

            function updateCallback(form) {
                $scope.forms[$scope.selected] = form;
            }
        }

        $scope.deleteForm = function (index) {
            FormService.deleteFormById($scope.forms[index].id).then(deleteCallback);

            function deleteCallback(response) {
                FormService.findAllFormsForUser(currentUser.id).then(callback);
            }
        }

        $scope.selectForm = function (index) {
            $scope.selected = index;
            $scope.name = $scope.forms[index].title;
        }
    }
    
})();