/*
 *
 * Details Controller
 * By Lebedenko Bogdan
 * 26/03/2016
 *
 */

myApp.directive('ccSpinner', function(){

    return {
        'transclude': true,
        'restrict': 'E',
        'templateUrl': 'templates/spinner.html',
        'scope' : {
            'isLoading' : '=',
            'message' : '@'
        }
    }

});