var controllers = require('./controllers');
var directives = require('./directives');
var services = require('./services');
var _ = require('underscore');

var components = angular.module('chirp-component', ['ngResource']);

_.each(controllers, function(controller, name) {
	components.controller(name, controller);
})

_.each(directives, function(directive, name) {
	components.directive(name, directive);
});

_.each(services, function(factory, name) {
	components.factory(name, factory)
})

var app = angular.module('chirpApp', ['chirp-component','ngRoute'])
								.run(function($rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';
	
	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = '';
	};
});

app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'templates/main.html',
			controller: 'mainController'
		})
		//the login display
		.when('/login', {
			templateUrl: 'templates/login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/register', {
			templateUrl: 'templates/register.html',
			controller: 'authController'
		});
});




