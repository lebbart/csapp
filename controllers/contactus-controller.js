/*
 *
 * Details Controller
 * By Lebedenko Bogdan
 * 27/03/2016
 *
 */

myApp.controller('contactUsController', ['$scope','$http', function($scope, $http) {

    $scope.contacts = {
        email: 'bogdan.lebedenko@gmail.com',
        phone: '+38 093 26 76 494',
        skype: 'bogdan.lebedenko'
    };

    //$scope.url = 'submit.php';
    //
    //$scope.formsubmit = function(isValid) {
    //    if (isValid) {
    //        $http.post($scope.url, {"name": $scope.name, "email": $scope.email, "message": $scope.message}).
    //        success(function(data, status) {
    //            console.log(data);
    //            $scope.status = status;
    //            $scope.data = data;
    //            $scope.result = data;
    //        })
    //    } else{
    //        alert('Form is not valid');
    //    }
    //
    //};

}]);