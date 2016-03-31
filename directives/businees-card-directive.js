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
            'user' : '=',
            'deleteUser' : '&'
        }
    }

});