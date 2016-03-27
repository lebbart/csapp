/*
 *
 * Details Controller
 * By Lebedenko Bogdan
 * 14/03/2016
 *
 */

myApp.controller('footerController', function($scope, $window){

    $scope.socialLinks = {
        'fb' : 'http://www.fb.com/bogdanlebedenko',
        'vk' : 'http://www.vk.com/bogdan.lebedenko',
        'github' : 'http://www.github.com/lebbart'
    };

    $scope.presentYear = new Date();
});