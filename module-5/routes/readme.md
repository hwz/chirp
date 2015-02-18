###Tying in Angular###

Because we're using EJS as our templating engine and it supports plain HTML, we can use our `index.html` as the default view -- changing the extension to `index.ejs` of course. We're going to move the rest of our files to the `/public/` folder yet again, to be served as static assets.


###Services###

We were using just an empty array for `posts`, but now we have a real backend that we can call out to! Let's start by replacing our empty array with the our actual feed of chirps! We'll create a simple `postService` factory with a `getAll` function that calls out to our API to get all the `chirps`.

####chirpApp.js####
```javascript
var app = angular.module('chirpApp', []);

app.controller('mainController', function($scope){
	$scope.posts = [];
	$scope.newPost = {created_by: '', text: '', created_at: ''};
	
	postService.getAll().success(function(data){
		$scope.posts = data;
	});

	$scope.post = function(){
		$scope.newPost.created_at = Date.now();
		$scope.posts.push($scope.newPost);
		$scope.newPost = {created_by: '', text: '', created_at: ''};
	};
});

app.factory('postService', function($http){
	var baseUrl = "/api/posts";
	var factory = {};
	factory.getAll = function(){
		return $http.get(baseUrl);
	};
	return factory;
});
```
