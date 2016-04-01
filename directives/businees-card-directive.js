/*
 *
 * Details Controller
 * By Lebedenko Bogdan
 * 26/03/2016
 *
 */

myApp.directive('ccCard', function(){

    return {
        'restrict': 'AE',
        'templateUrl': 'templates/business-card.html',
        'scope' : {
            'user' : '='
        },
        'controller': function($scope, contactService) {

            $scope.isDeleting = false;
            $scope.deleteUser = function () {
                $scope.isDeleting = true;
                contactService.removeContact($scope.user).then(function(){
                    $scope.isDeleting = false;
                });
            };

        }
    }

});