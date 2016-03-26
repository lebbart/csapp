/*
 *
 * Details Controller
 * By Lebedenko Bogdan
 * 26/03/2016
 *
 */

myApp.controller('ngRepeatCtrl', function($scope, $modal, contactService){
    $scope.search = '';
    $scope.order = '-name';
    $scope.contacts = contactService;

    $scope.loadMore = function() {
        $scope.contacts.loadMore();
    };

    $scope.showCreateModal = function() {
        $scope.contacts.selectedPerson = {};
        $scope.createModal = $modal({
            scope: $scope,
            templateUrl: 'templates/modal.create.tpl.html',
            show: true
        });
    };

    $scope.addContact = function() {
        $scope.contacts.addContact($scope.contacts.selectedPerson).then(function () {
                $scope.createModal.hide();
        });
    };
});