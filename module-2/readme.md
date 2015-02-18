##Setting up the front end with Angular.js##


###The Setup###

####Creating an Angular module and controller

First things first, we'll need to create an Angular app that's going to control the all the functionality for the our application's front end. Let's call that `chirpApp.js`. We can then integrate it into our `main.html`, `login.html`, and `signup.html` views.

In here, we'll create a `module` named `chirpApp` to contain all the logic for this Angular app. We'll also add in a `controller` named `mainController` that takes care of our core functionality, such as creating and displaying posts. We're going to leave these empty for now.

```javascript
//chirpApp.js
var app = angular.module('chirpApp', []);

app.controller('mainController', function(){
});
```
####Setting up a a template
We can use this in our primary template, `main.html`. This should contain a form for post creation, as well as a place to display the feed of posts. Let's scaffold everything out except for the posts display for the time being. We'll input a username with a text field for now, since we don't have a logged in user.


```html
<!--main.html-->
<!doctype html>
<html>
  <head>
    <title>Chirp</title>
  </head>
  <body>
    <div id='main'>
      <form>
        <input type="text" placeholder="Your name" /> 
        <textarea required maxlength="200" rows="3" placeholder="Say something"></textarea>
        <input class="button" type="submit" value="Chirp!" />
      </form>
      <div id="post-stream">
        <h4>Chirp Feed</h4>
              <!--to be populated by Angular-->
        </div>
      </div>
    </div>
  </body>
</html>
```

Now, let's go in and connect this up to our Angular app.

First things first, we'll need to include the Angular files. The easiest and quickest way to grab the core files is the [Google CDN](https://docs.angularjs.org/misc/downloading). We'll also include our `chirpApp.js` file. Next, we'll add the `ng-app` directive to the top-level element of our app to bootstrap our`chirpApp` module to it. In this case, that'd be the `<body>` tag. While we're at it, we should also add the `ng-controller` directive to the top level of the main section and point it to our `mainController`.

```html
<!--main.html-->
<!doctype html>
<html>
  <head>
    <title>Chirp</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.min.js"></script>
    <script src="javascripts/chirpApp.js"></script>
  </head>
  <body ng-app="chirpApp">
    <div id='main' ng-controller="mainController">
        ...
    </div>
  </body>
</html>
```

###Connecting Model and View###

####$scope variables
Now that the two are connected, we can create objects in our `mainController` for our view to access and display. We're going to invoke a `$scope` object as we're constructing our `mainController`. The `$scope` object is increbibly important, and is the Model part of our Model-View-Controller. It is shared between our controller and our view, and is how we can pass data and even functions between the two.

We'll attach a `posts` array to our `$scope` to store all the posts that are created. 

We'll also create a `newPost`on our `$scope` variable to store information on the post that's being created. We'll save the name of the post's creator, the text content of the post, as well as a timestamp.

We can then write a `post` function that will add the contents of `newPost` to our `posts` array whenever the "Chirp!" button is pressed. We'll also set the timestamp here. Since we want to call this from within the view, we'll attach this to the `$scope` as well.


```javascript
//chirpApp.js
var app = angular.module('chirpApp', []);

app.controller('mainController', function($scope){
  $scope.posts = [];
  $scope.newPost = {created_by: '', text: '', created_at: ''};
  
  $scope.post = function(){
    $scope.newPost.created_at = Date.now();
    $scope.posts.push($scope.newPost);
    $scope.newPost = {created_by: '', text: '', created_at: ''};
  };
});
```

####Data Binding and Filtering

Now, let's start integrating and calling these from our `main.html`. We can use the `ng-model` directive to bind the properties of `newPost` to our chirp posting form. 

We can even start displaying the chirp feed now. The `ng-repeat` directive is perfect for this. When we use it with the syntax `ng-repeat = post in posts` on our, Angular will access the `posts` variable and loop through and set each to `post`. Then we can access the details of each `post` and display them. 

`post.created_by` and `post.text` are straightforward enough to display with just `{{post.created_by}}` and `{{post.text}}` since they're just text, but what about `posts.created_at`? It's just an unformatted timestamp right now, but we can format it with a filter. This can be done right in the template binding, by just specifying the format you'd like. In this case, we'll use `{{post.created_at| date:"h:mma 'on' MMM d, y"}}`

We also use a simple `orderBy` filter on our `ng-repeat` to determine the order our chirps are displayed in, and we   tack on classes for odd and even repeats in `ng-repeat`, so that we can style them differently later on.

```html
<!--main.html-->
<html>
  <head>
    <title>Chirp</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.min.js"></script>
    <script src="javascripts/chirpApp.js"></script>
  </head>
  <body ng-app="chirpApp">
    <div id='main' ng-controller="mainController">
      <form ng-Submit="post()">
        <input required type="text" placeholder="Your name" ng-model="newPost.created_by" /> 
        <textarea required maxlength="200" rows="3" placeholder="Say something" ng-model="newPost.text"></textarea>
        <input class="button" type="submit" value="Chirp!" />
      </form>
      <div id="post-stream">
        <h4>Chirp Feed</h4>
            <div class='post' ng-repeat="post in posts | orderBy:'created_at':true" ng-class-odd="'odd'" ng-class-even="'even'">
            <p>{{post.created_by}} says {{post.text}} at {{post.created_at}}</p>
            </div>
      </div>
    </div>
  </body>
</html>
```

###Styling###

Okay, this is starting to work! Our page is looking pretty rough though, and we can't even see the effects of our odd and even classes, so let's add some formatting onto it. We'll use Bootstrap and add in a stylesheet that I created earlier, which you can find in the `stylesheets/` folder. Let's look at the results!


```html
<!--main.html-->
<html>
  <head>
    <title>Chirp</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.min.js"></script>
    <script src="javascripts/chirpApp.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="stylesheets/style.css">
  </head>
  <body ng-app="chirpApp">
    <div id='main' class="container" ng-controller="mainController">
      <div class="col-md-offset-2 col-md-8">
        <div class="clearfix">
          <form ng-Submit="post()">
            <input required type="text" class="form-control" placeholder="Your name" ng-model="newPost.created_by" /> 
            <textarea required class="form-control" maxlength="200" rows="3" placeholder="Say something" ng-model="newPost.text"></textarea>
            <input class="btn submit-btn pull-right" type="submit" value="Chirp!" />
          </form>
          <div id="post-stream">
            <h4>Chirp Feed</h4>
                <div class="post" ng-repeat="post in posts | orderBy:'created_at':true" ng-class-odd="'odd'" ng-class-even="'even'"> 
                  <p>{{post.text}}</p>
                <small>Posted by @{{post.created_by}}</small>
                <small class="pull-right">{{post.created_at | date:"h:mma 'on' MMM d, y"}}</small>
                </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```

###Register and Login###

####Authentication Controllers

While we don't have user accounts yet, we soon will. Let's take a moment to create login and registration pages. Since they're both authentication pages and will make use of the same `user` model, let's just have them both use one `authController`. 

We'll add this to our `chirpApp.js` and add an empty `user` to the `$scope`. This will pass the credentials that the user has inputted back to our controller, and be accessed by our `login` and `register` functions. 

We'll also add `error_message` to our scope to tell users about anything that might have gone wrong in the authentication process. 

Since we don't have an authentication backend yet, let's use `login` and `register` to populate the error message with a confirmation that we tried to login/register for now.

```javascript
//chirpApp.js
var app = angular.module('chirpApp', []);

app.controller('mainController', function($scope){
  ...
  };
});
app.controller('authController', function($scope){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  postService.getAll().success(function(data){
    $scope.posts = data;
  });

  $scope.login = function(){
    //placeholder until authentication is implemented
    $scope.error_message = 'login request for ' + $scope.user.username;
  };

  $scope.register = function(){
    //placeholder until authentication is implemented
    $scope.error_message = 'registeration request for ' + $scope.user.username;
  };
});
```

####Authentication Templates

While they can share the same controller, they'll need separate templates. We'll create a `login.html` as well as a `register.html`. To save some time, I've styled the form control a little with the `"form-auth"` class, and I'm using the `ng-app` and `ng-controller` directives just as before, and setting `ng-controller="authController"`. We're then going to use ng-model to bind the username and password to our `$scope`. 

The only differences between `login.html` and `register.html` should be the form headings and the `ng-submit` function, which should be set to its respective functions.

```html
<!--register.html-->
<html>
  <head>
    <title>Chirp</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.min.js"></script>
    <script src="javascripts/chirpApp.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="stylesheets/style.css">
  </head>
  <body ng-app="chirpApp">
    <div id='main' class="container" ng-controller="authController">
      <form class="form-auth" ng-submit="register()">
        <h2>Register</h2>
        <p class="text-warning">{{error_message}}</p>
        <input type="username" ng-model="user.username" placeholder="Username" class="form-control"><br>
        <input type="password" ng-model="user.password" placeholder="Password" class="form-control"><br>
        <input type="submit" value="Register" class="btn btn-primary" />
      </form>
    </div>
  </body>
</html>
```

```html
<!--login.html-->
<html>
  <head>
    <title>Chirp</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.min.js"></script>
    <script src="javascripts/chirpApp.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="stylesheets/style.css">
  </head>
  <body ng-app="chirpApp">
    <div id='main' class="container" ng-controller="authController">
      <form class="form-auth" ng-submit="login()">
        <h2>Log In</h2>
        <p class="text-warning">{{error_message}}</p>
        <input type="username" ng-model="user.username" placeholder="Username" class="form-control"><br>
        <input type="password" ng-model="user.password" placeholder="Password" class="form-control"><br>
        <input type="submit" value="Log in" class="btn btn-primary" />
      </form>
    </div>
  </body>
</html>
```

###Creating a Single Page App###

####Creating Partials
We have three views and we can navigate to each one by changing the URL, but one of the joys of Angular is that you don't have to reload all your resources. Instead, we can combine these into the infamous single page application, and create `partial templates` that we'll dynamically load into the view when we need them. 


Let's begin by making the base `layout template` page, `index.html`. We can put all of our javascript and css links here. We'll also set the directive for our `ng-app` here.

The `ng-view` directive is used to indicate where each view partial will be injected if it is needed. 

```html
<!--index.html-->
<html>
  <head>
    <title>Chirp</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.min.js"></script>
    <script src="javascripts/chirpApp.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="stylesheets/style.css">
  </head>
  <body ng-app="chirpApp">
    <div id='main' class="container">
      <div class="col-md-offset-2 col-md-8">
        <div ng-view>
        </div>
      </div>
    </div>
  </body>
</html>
```

We can transform our `main.html`, `login.html`, and `register.html` into simple partials, to load them from here. This will be what they can look like after:

```html
<!--main.html-->
<div class="clearfix">
  <form ng-Submit="post()">
    <input required type="text" class="form-control" placeholder="Your name" ng-model="newPost.created_by" /> 
    <textarea required class="form-control" maxlength="200" rows="3" placeholder="Say something" ng-model="newPost.text"></textarea>
    <input class="btn submit-btn pull-right" type="submit" value="Chirp!" />
  </form>
  <div id="post-stream">
    <h4>Chirp Feed</h4>
      <div class="post" ng-repeat="post in posts | orderBy:'created_at':true" ng-class-odd="'odd'" ng-class-even="'even'"> 
        <p>{{post.text}}</p>
        <small>Posted by @{{post.created_by}}</small>
        <small class="pull-right">{{post.created_at | date:"h:mma 'on' MMM d, y"}}</small>
      </div>
  </div>
</div>
```

```html
<!--login.html-->
<form class="form-auth" ng-submit="login()">
  <h2>Log In</h2>
  <p class="text-warning">{{error_message}}</p>
  <input type="username" ng-model="user.username" placeholder="Username" class="form-control"><br>
  <input type="password" ng-model="user.password" placeholder="Password" class="form-control"><br>
  <input type="submit" value="Log in" class="btn btn-primary" />
</form>

```

```html
<!--register.html-->
<form class="form-auth" ng-submit="register()">
  <h2>Register</h2>
  <p class="text-warning">{{error_message}}</p>
  <input type="username" ng-model="user.username" placeholder="Username" class="form-control"><br>
  <input type="password" ng-model="user.password" placeholder="Password" class="form-control"><br>
  <input type="submit" value="Register" class="btn btn-primary" />
</form>
```

####Routing with ngRoute

Much shorter, right? You might also have noticed that we've taken out any mention of what controller each is going to use. That's because we'll do this in our routing inside `chirpApp.js`. We'll be making use of `ngRoute`, and Angular-provided module that we'll add as a dependency. It's packaged separately from the rest of Angular, so we'll also need to link to it from our `index.html`.

```html
<!--index.html-->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular-route.min.js"></script>
```

Application routes in Angular are declared using the `$routeProvider`, which will wire up templates and controllers depending on the browser's location. 

```javascript
//chirpApp.js
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
      controller: 'authController'
    })
    //the signup display
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'authController'
    });
});
...
```

####Running it on an HTTP server

If we now run this as-is, we're going to see that we run into some CORS errors. Because loading new views in Angular will require us to make some cross origin requests, we're going to need to serve our app on an HTTP server. I'm just going to set up a lightweight node server for now and have it serve all of the files we've already created. Because Node will be covered in the next module, I'm not going to go into much detail. We're just going to put all of our Angular files into the `/public/` folder, and point Node to it as our default page.

```javascript
//app.js for Node.js server
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));     //serve static assets
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(port, function() {
    console.log('Listening on ' + port);
});
```

And now if we run this, it should all work!

###Adding Navigation
Since we're can render our partials views in only part of the page, we can put a nice florish on our app by putting a navigation header in our index. It should then get displayed across each of our views. We're going to make use of the typical Bootstrap navigation element.

```html
<!--index.html-->
<html>
  <head>
    <title>Chirp</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular-route.js"></script>
    <script src="javascripts/chirpApp.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="stylesheets/style.css">
  </head>
  <body ng-app="chirpApp">
    <div id='main' class="container">
      <nav class="navbar-fluid navbar-default navbar-fixed-top">
        <div class="container">
          <a class="navbar-brand" href="#"> Chirp! </a>
          <p class="navbar-text"> Learn the MEAN stack by building this tiny app</p>
          <p class="navbar-right navbar-text"><a href="#/login">Login</a> or <a href="#/register">Register</a></p>
        </div>
      </nav>
      <div class="col-md-offset-2 col-md-8">
        <div ng-view>
        </div>
      </div>
    </div>
  </body>
</html>
```



