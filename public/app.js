var app = angular.module('chirpApp', ['ngRoute']);

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
			controller: 'loginController'
		})
});


app.factory('Posts', function ($http) {
 	return $http.get('sample.json');
});
	
app.controller('mainController', function($scope, Posts){
	$scope.posts = [];
	Posts.success(function(data){
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


app.controller('loginController', function($scope){

});