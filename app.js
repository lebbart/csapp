var myApp = angular.module('myApp', [
		'ngResource',
		'ui.router',
		'infinite-scroll',
		'angularSpinner',
		'angular-ladda',
		'jcs-autoValidate',
		'mgcrea.ngStrap',
		'toaster',
		'ngAnimate'
]);

myApp.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
			.state('list', {
				url: "/",
				templateUrl: "templates/list.html",
				controller: "ngRepeatCtrl"
			})
			.state('details', {
				url: "/details/:email",
				templateUrl: "templates/details.html",
				controller: 'detailCtrl'
			})
			.state('create', {
				url: "/create/",
				templateUrl: "templates/create.html",
				controller: 'PersonCreateController'
			})
			.state('about',{
				url: "/about/",
				templateUrl: "templates/about.html",
				controller: 'aboutUsController'
			})
			.state('contacts', {
				url: "/contacts/",
				templateUrl: "templates/contacts.html",
				controller: 'contactUsController'
			});

	$urlRouterProvider.otherwise("/");
});

// Config
myApp.config(function ($httpProvider, $resourceProvider, laddaProvider, $datepickerProvider) {
	$httpProvider.defaults.headers.common['Authorization'] = 'Token 84a2b969af0566a0d678bffe3e5463690d8d2af0';
	$resourceProvider.defaults.stripTrailingSlashes = false;
	laddaProvider.setOption({
		style: 'expand-right'
	});
	angular.extend($datepickerProvider.defaults, {
		dateFormat: 'dd/MM/yyyy',
		autoclose: true
	});
});

myApp.factory("Contact", function ($resource) {
	return $resource("https://codecraftpro.com/api/samples/v1/contact/:id/", {id:'@id'}, {
		update: {
			method: 'PUT'
		}
	});
});

myApp.filter('defaultImage', function() {
	return function (input, param) {
		if(!input) {
			return '../img/noimage.png'
		}
		return input;
	}
});