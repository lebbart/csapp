/*
 *
 * Details Controller
 * By Lebedenko Bogdan
 * 14/03/2016
 *
 */

myApp.controller('detailCtrl', function($scope, $stateParams, $state, $modal, contactService){
    //console.log($stateParams);
    $scope.contacts = contactService;
    $scope.contacts.selectedPerson = $scope.contacts.getPerson($stateParams.email);

    $scope.showUpdateModal = function() {
        $scope.updateModal = $modal({
            scope: $scope,
            templateUrl: 'templates/modal.update.tpl.html',
            show: true
        });
    };

    $scope.updateContact = function() {
        $scope.contacts.updateContact($scope.contacts.selectedPerson).then(function(){
            $scope.updateModal.hide();
            $state.go('list');
        });
    };

    $scope.remove = function() {
        $scope.contacts.removeContact($scope.contacts.selectedPerson).then(function(){
            $state.go('list');
        });
    };

    $scope.presentYear = new Date();
});