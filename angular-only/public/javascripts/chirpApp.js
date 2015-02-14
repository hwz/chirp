var app = angular.module('chirpApp', ['ngRoute']).run(function($http, $rootScope) {
	$rootScope.current_user = 'Guest';
});

app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		//the login display
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/signup', {
			templateUrl: 'signup.html',
			controller: 'authController'
		});
});


// //used for basic read from json
// app.factory('postService', function($http){
// 	var baseUrl = "sample.json";
// 	var factory = {};
// 	factory.getAll = function(){
// 		return $http.get(baseUrl);
// 	};
// 	return factory;
// });

// myapp.directive('chirp', function() {
//     var directive = {};

//     directive.restrict = 'E'; //elements only
//     directive.template = 

//     return directive;
// });

app.controller('mainController', function($scope, $rootScope, $http){
	$scope.posts = [];
	$scope.newPost = "";

	// //used for basic read from json
	// postService.getAll().success(function(data){
	// 	$scope.posts = data;
	// });
	$http.get('sample.json').success(function(data){
		$scope.posts = data;
	});
	

	$scope.post = function () {
		$scope.posts.push({created_by: $rootScope.current_user, text: $scope.newPost, created_at: Date.now()});
		
		//resets post
		$scope.newPost = "";
	};
});
app.controller('authController', function($scope, $http, $rootScope, $location){
	$scope.user = {username: '', password: ''};
	$scope.newUser = {username: '', password: ''};
	$scope.error_message = '';

	$scope.login = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				$location.path('/');
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};

	$scope.register = function(){
		$http.post('/auth/signup', $scope.newUser).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				$location.path('/');
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};
});