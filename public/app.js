var app = angular.module('chirpApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		//the login display
		.when('/auth', {
			templateUrl: 'auth.html',
			controller: 'authController'
		})
});


app.factory('postService', function ($http){
	var baseUrl = "sample.json";
	var factory = {};

	factory.getAll = function(){
		return $http.get(baseUrl);
	};

	return factory;
});
	
app.controller('mainController', function($scope, postService){
	$scope.posts = [];
	postService.getAll().success(function(data){
		$scope.posts = data;
	});
	$scope.post = {screen_name: '', text: '', created_at: 0};

	$scope.submitPost = function () {
		$scope.post.created_at = Date.now();
		$scope.posts.push($scope.post);

		//reset
		$scope.post = {screen_name: '', text:'', created_at: 0};
	};
});


app.controller('authController', function($scope){

});