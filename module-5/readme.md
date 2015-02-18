###Tying things up in Angular###

Because we're using EJS as our templating engine and it supports plain HTML, we can use our `index.html` as the default view -- changing the extension to `index.ejs` of course. We're going to move the rest of our files to the `/public/` folder yet again, to be served as static assets.

###Authentication###

When we last left our `authController`, we left the authentication functions quite blank. Now, let's go through and actually implement them.

####Creating authentication variables

First off, we'll need some place to store our authentication state that all of our controllers can access. Each controller only has access to its own `$scope`, but they all have access to the `$rootScope` of the module. Let's go ahead and initialize some some authentication variables there. Note that we're also specifying `$rootScope` as a dependency.

```javascript
//chirpApp.js
var app = angular.module('chirpApp', ['ngRoute', 'ngResource']).run(function($rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
  };
});
...
```

####Handling authentication responses

When users enter their credentials and log in, we should make request to the `/auth/login` endpoint we created previously. If it's successful, we should set our authentication status in the `$rootScope` appropriately (note the `$rootScope` dependency)and redirect them to our posts stream. If it's not successful, we'll display an error message similar to what we did before. The same should happen for our registration page with `/auth/register`.

In order to redirect our users on successful authentications, we'll need to use the `$location` service and direct our app to the path we'd like to go to. In this case, it's just our main view at `/`.

```javascript
chirpApp.js
app.controller('authController', function($scope, $http, $rootScope, $location){
  $scope.user = {username: '', password: ''};
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
    $http.post('/auth/signup', $scope.user).success(function(data){
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
```
####Signing out

If we're signing users in, we'll also need a way to sign users out. I'd like for users to be able to do this straight from the navigation, so we'll need to put this function in the `rootScope` as well. 

```javascript
//chirpApp.js
var app = angular.module('chirpApp', ['ngRoute', 'ngResource']).run(function($http, $rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';

  $rootScope.signout = function(){
    $http.get('auth/signout');
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
  };
});
```

####Creating authentication-sensitive elements

Now, let's link to this in the navigation header! We'll use the `ng-click` directive to call the `signout` function if Logout is clicked. While we're at it, we can use the `ng-show` directive to check out `authenticated` status to only display it if a user is authenticated. We can also display the authenticated user with `ng-show` and `{{current_user}}`. Last but not least, we'll use `ng-hide='authenticated'` to hide the login and registration links if the user is already logged in.

```html
<!--index.html-->
...
<nav class="navbar-fluid navbar-default navbar-fixed-top">
  <div class="container">
    <a class="navbar-brand" href="#"> Chirp! </a>
    <p class="navbar-text"> Learn the MEAN stack by building this tiny app</p>
    <p class="navbar-right navbar-text" ng-hide="authenticated"><a href="#/login">Login</a> or <a href="#/signup">Register</a></p>
    <p class="navbar-right navbar-text" ng-show="authenticated"><a href="#" ng-click="signout()">Logout</a></p>
    <p class="navbar-right navbar-text" ng-show="authenticated">Signed in as {{current_user}}</p>
  </div>
</nav>
...
```


###Services###

####Calling our APIs through a Factory Service
We were using just an empty array for `posts`, but now we have a real backend that we can call out to! Let's start by replacing our empty array with the our actual feed of chirps! We'll create a simple `postService` factory with a `getAll` function that calls out to our API to get all the `chirps` we already have using the `$http` service. Note that since we're going to use `postService` in our `mainController`, we'll need to add it as a dependency. 

```javascript
//chirpApp.js
var app = angular.module('chirpApp', []);

app.controller('mainController', function($scope, postService){
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

####Using ngResource

Since our API is a fully RESTful one, Angular has a service that we can use instead of having to manually call out to our endpoint with each type of request, called `ngResource`. This isn't packaged with Angular, so we'll have to go through and  include it in our project.

We can then simply use the `$resource` in our `postService` factory, pass our endpoint to `$resource`, and start performing CRUD operations. We can now use the `query` method to `GET` all of our posts instead. 

```html
<!--index.html-->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular-resource.js"></script>
```

```javascript
//chirpApp.js
var app = angular.module('chirpApp', ['ngRoute', 'ngResource']);

...

app.controller('mainController', function($scope, postService){
  $scope.posts = postService.query();

  ...

});

app.factory('postService', function($resource){
  return $resource('/api/posts/:id');
});
```

####Limiting posts

Now that we have authenticated users, we should only let them post chirps. Let's use our `ng-show` directive like before to only display the chirp form if a user is logged in. While we're at it, we can also take out the input field for a username, and display the handle of the logged in user, `current_user`, instead.

```html
<!--main.html-->
<div class="clearfix">
  <form ng-Submit="post()" ng-show="authenticated">
    <h4>{{current_user}} says</h4>
    <textarea required class="form-control" maxlength="200" rows="3" placeholder="Say something" ng-model="newPost.text"></textarea>
    <input class="btn submit-btn pull-right" type="submit" value="Chirp!" />
  </form>
</div>

...

```

We'll then add `current_user` to `newPost` before we send it to the backend. We'll use the `save` function to `POST` our new chirp to our API. Since we want it to show up in our feed, we'll fetch the updated feed again in its callback function. We'll also reset the current `post` to be blank again. 

```
//chirpApp.js
...
$scope.post = function() {
  $scope.newPost.created_by = $rootScope.current_user;
  $scope.newPost.created_at = Date.now();
  postService.save($scope.newPost, function(){
    $scope.posts = postService.query();
    $scope.newPost = {created_by: '', text: '', created_at: ''};
  });
};
...
```
We can use `postFactory` for so much more, whether it's deleting posts or finding a post by its ID. That won't be covered in the scope of this module, but it does show the power of `ngResource`. You can find out more about it in the [AngularJS Docs](https://docs.angularjs.org/api/ngResource)