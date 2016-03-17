/*
*
* Contact Resourse
* By Lebedenko Bogdan
* 14/03/2016
*
 */

myApp.factory("Contact", function ($resource) {
	return $resource("https://codecraftpro.com/api/samples/v1/contact/:id", {
		update: {
			id:'@id',
			method: 'PUT'
		}
	});
});