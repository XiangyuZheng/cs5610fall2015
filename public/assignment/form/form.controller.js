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

        $scope.updateForm = function () {
            if ($scope.selected != null) {
                $scope.forms[$scope.selected].name = $scope.name;
                FormService.updateFormById($scope.forms[$scope.selected].id, $scope.forms[$scope.selected], updateCallback);
            }
            
            function updateCallback(form) {
                $scope.forms[$scope.selected] = form;
            }
        }
        
        $scope.deleteForm = function (index) {
            FormService.deleteFormById($scope.forms[index].id, deleteCallback);

            function deleteCallback(forms) {
                $scope.forms = forms;
            }
        }
        
        $scope.selectForm = function (index) {
            $scope.selected = index;
            $scope.name = $scope.forms[index].name;
        }
    }
})();