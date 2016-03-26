/**
 * Created by Bogdan on 3/26/16.
 */

myApp.service('contactService', function (Contact, $rootScope, $q, toaster) {
    var self = {
        'getPerson': function(email) {
            for (var i = 0; i < self.persons.length; i++) {
                var obj = self.persons[i];
                if (obj.email == email){
                    return obj;
                }
            }
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
        'ordering' : 'name',
        'doSearch' : function () {
            self.hasMore = true;
            self.page = 1;
            self.persons = [];
            self.loadContacts();
        },
        'doOrder' : function () {
            self.hasMore = true;
            self.page = 1;
            self.persons = [];
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
            var d = $q.defer();
            self.isSaving = true;
            person.$update().then(function() {
                self.isSaving = false;
                toaster.pop('success', 'Updated ' + person.name);
                d.resolve();
            });
            return d.promise;
        },
        'removeContact' : function(person) {
            var d = $q.defer();
            self.isRemoving = true;
            person.$remove().then(function() {
                self.isRemoving = false;
                var index = self.persons.indexOf(person);
                self.persons.splice(index, 1);
                self.selectedPerson = null;
                toaster.pop('success', 'Contact ' + person.name + ' removed.');
                d.resolve();
            });
            return d.promise;
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
        },
        'watchFilters': function() {
            $rootScope.$watch(function() {
                return self.search;
            }, function(newVal) {
                if(angular.isDefined(newVal)) {
                    self.doSearch();
                }
            });

            $rootScope.$watch(function () {
               return self.ordering;
            }, function(newVal) {
                if(angular.isDefined(newVal)) {
                    self.doOrder();
                }
            });
        }
    };
    self.loadContacts();
    self.watchFilters();

    return self;
});