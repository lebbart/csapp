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

myApp.controller('detailCtrl', function($scope, $modal, contactService){
	$scope.contacts = contactService;

	$scope.save = function() {
		$scope.contacts.updateContact($scope.contacts.selectedPerson);

	};

	$scope.showUpdateModal = function() {
		$scope.updateModal = $modal({
			scope: $scope,
			template: 'templates/modal.update.tpl.html',
			show: true
		});
	};

	$scope.remove = function() {
		$scope.contacts.removeContact($scope.contacts.selectedPerson);
	};

	$scope.presentYear = new Date();
});

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
			template: 'templates/modal.create.tpl.html',
			show: true
		});
	};

	$scope.addContact = function() {
		$scope.contacts.addContact($scope.contacts.selectedPerson)
				.then(function () {
					$scope.createModal.hide();
				});
	};

	$scope.$watch('search', function(newVal, oldVal) {
		if (angular.isDefined(newVal)) {
			$scope.contacts.doSearch(newVal);
		}
	});

	$scope.$watch('order', function(newVal, oldVal) {
		if (angular.isDefined(newVal)) {
			$scope.contacts.doOrder(newVal);
		}
	});
});

myApp.factory("Contact", function ($resource) {
	return $resource("https://codecraftpro.com/api/samples/v1/contact/:id/", {id:'@id'}, {
		update: {
			method: 'PUT'
		}
	});
});

myApp.filter('defaultImage', function(){
	return function (input, param) {
		if(!input) {
			return '../img/noimage.png'
		}
		return input;
	}
});

// Service
myApp.service('contactService', function (Contact, $q, toaster) {
	var self = {
		'addPerson' : function (person) {
			this.persons.push();
		},
		'page': 1,
		'hasMore': true,
		'isLoading': false,
		'isSaving' : false,
		'isRemoving' : false,
		'isAdding' : false,
		'selectedPerson': null,
		'persons': [],
		'search' : null,
		'doSearch' : function (search) {
			self.hasMore = true;
			self.page = 1;
			self.persons = [];
			self.search = search;
			self.loadContacts();
		},
		'doOrder' : function (order) {
			self.hasMore = true;
			self.page = 1;
			self.persons = [];
			self.ordering = order;
			self.loadContacts();
		},
		'loadContacts': function () {
			if (self.hasMore && !self.isLoading) {
				self.isLoading = true;
				var params = {
					'page' : self.page,
					'search' : self.search,
					'ordering' : self.ordering
				};
				Contact.get(params, function(data){
					angular.forEach(data.results, function(person) {
						self.persons.push(new Contact(person));
					});

					if(!data.next) {
						self.hasMore = false;
					}
					self.isLoading = false;
				});
			}
		},
		'loadMore': function() {
			if (self.hasMore && !self.isLoading) {
				self.page += 1;
				self.loadContacts();
			}
		},
		'updateContact' : function(person) {
			self.isSaving = true;
			person.$update().then(function() {
				self.isSaving = false;
				toaster.pop('success', 'Updated ' + person.name);
				$scope.createModal.hide();
			});
		},
		'removeContact' : function(person) {
			self.isRemoving = true;
			person.$remove().then(function() {
				self.isRemoving = false;
				var index = self.persons.indexOf(person);
				self.persons.splice(index, 1);
				self.selectedPerson = null;
				toaster.pop('success', 'Contact ' + person.name + ' removed.');
			});
		},
		'addContact' : function(person) {
			var d = $q.defer();
			self.isSaving = true;
			Contact.save(person).$promise.then(function(){
				self.isSaving = false;
				self.selectedPerson = null;
				self.hasMore = true;
				self.page = 1;
				self.persons = [];
				toaster.pop('success', 'Contact ' + person.name + ' added.');
				self.loadContacts();
				d.resolve();
			});
			return d.promise;
		}
	};
	self.loadContacts();
	return self;
});