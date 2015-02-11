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
app.factory("User", function($http){
	var baseUrl = "/users/current";
	var factory = {};
	factory.getCurrent = function(){
		return $http.get(baseUrl);
	};
	return factory;
});
app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});
app.controller('mainController', function($scope, User, postService){
	$scope.posts = postService.query();
	$scope.post = {created_by: '', text: '', created_at: 0};
	$scope.current_user = '';
	User.getCurrent().success(function(data){
		$scope.current_user = data;
	});
/*
//used for basic read from json
	postService.getAll().success(function(data){
		$scope.posts = data;
	});
*/
	$scope.post = function () {
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


app.controller('authController', function($scope, $http, $location){
	$scope.user = {username: '', password: ''};
	$scope.newUser = {username: '', password: ''};

	$scope.login = function(){
		$http.post('/auth/login', $scope.user).
			success(function(){
				$location.path('/');
			});
	};

	$scope.register = function(){
		$http.post('/auth/signup', $scope.newUser).
			success(function(){
				$location.path('/');
			});
	};
});