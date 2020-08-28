Backbone.emulateHTTP = false; // set to true if server cannot handle HTTP PUT or HTTP DELETE
Backbone.emulateJSON = false; // set to true if server cannot handle application/json requests

// Overwriting jQuery ajax method - now actual request will be made
var ajaxSettings;
$.ajax = function (ajaxRequest) {
    ajaxSettings = ajaxRequest;
};

// Create a new library collection
var Library = Backbone.Collection.extend({
    url : function() { return '/library'; }
});

// Define attributes for our model
var attrs = {
    title  : "The Tempest",
    author : "Bill Shakespeare",
    length : 123
};

// Create a new Library instance
var library = new Library;

// Create a new instance of a model within our collection
library.create(attrs, {wait: false});

// Update with just emulateHTTP
library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'}, {
  emulateHTTP: true
});

// Check the ajaxSettings being used for our request
console.log(ajaxSettings.url === '/library/2-the-tempest'); // true
console.log(ajaxSettings.type === 'POST'); // true
console.log(ajaxSettings.contentType === 'application/json'); // true

// Parse the data for the request to confirm it is as expected
var data = JSON.parse(ajaxSettings.data);
console.log(data.id === '2-the-tempest');  // true
console.log(data.author === 'Tim Shakespeare'); // true
console.log(data.length === 123); // true

// ==================================================================================
library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'}, {
    emulateJSON: true
});

console.log(ajaxSettings.url === '/library/2-the-tempest'); // true
console.log(ajaxSettings.type === 'PUT'); // true
console.log(ajaxSettings.contentType ==='application/x-www-form-urlencoded'); // true

var data = JSON.parse(ajaxSettings.data.model);
console.log(data.id === '2-the-tempest'); // true
console.log(data.author ==='Tim Shakespeare'); // true
console.log(data.length === 123); // true