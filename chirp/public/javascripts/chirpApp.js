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

/*
//used for basic read from json
app.factory('postService', function($http){
	var baseUrl = "sample.json";
	var factory = {};
	factory.getAll = function(){
		return $http.get(baseUrl);
	};
	return factory;
});
*/
	
app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});

app.controller('mainController', function($scope, postService){
	$scope.posts = postService.query();
	$scope.post = {created_by: '', text: '', created_at: 0};
/*
//used for basic read from json
	postService.getAll().success(function(data){
		$scope.posts = data;
	});
*/
	$scope.submit = function () {
		postService.save($scope.post, function(res){
			$scope.posts = postService.query();
			$scope.post = {created_by: '', text:'', created_at: 0};	
		});
	};
	$scope.delete = function(post){
		postService.delete({id: post._id})
		$scope.posts = postService.query();
	};
});


app.controller('authController', function($scope){

});