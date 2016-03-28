/*
 *
 * Details Controller
 * By Lebedenko Bogdan
 * 27/03/2016
 *
 */

myApp.controller('PersonCreateController', function($scope, $state, contactService) {

    $scope.contacts = contactService;

    $scope.addContact = function() {
        $scope.contacts.addContact($scope.contacts.selectedPerson)
        .then(function () {
            //$scope.createModal.hide();
            $state.go('list');
        });
    };

});