/*
 *
 * About Us Controller
 * By Lebedenko Bogdan
 * 27/03/2016
 *
 */

myApp.controller('aboutUsController', function($scope) {

    $scope.author = {
        name: 'Bogdan',
        surname: 'Lebedenko',
        position: 'Front-end Developer'
    };

    $scope.skills = [
        {name: 'HTML/CSS', percent: 80},
        {name: 'JavaScript', percent: 30},
        {name: 'Design', percent: 70},
        {name: 'PHP', percent: 30},
        {name: 'Wordpress', percent: 60},
        {name: 'LESS/SAAS', percent: 80},
        {name: 'jQuery', percent: 50},
        {name: 'Bootstrap', percent: 80},
        {name: 'Foundation', percent: 80},
        {name: 'MySQL', percent: 25},
        {name: 'Jira', percent: 40},
        {name: 'Git', percent: 40}
    ];

});