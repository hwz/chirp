A work in progress -- Teaching example for the MEAN stack by building out a Twitter clone named Chirp!

###Building Chirp, a MEAN Twitter Clone###
insert cute little intro here

- mention each technology and what it's for/why it's great, link to each
- building something from scratch is a great way to learn
- shoutout to some great scaffolding tools



###Setting up the front end###

First things first, we'll need to create an Angular app that's going to control the all the functionality for the our application's front end. Let's call that `chirpApp.js`. We can then integrate it into our `main.html`, `login.html`, and `signup.html` views.

In here, we'll create a `module` named `chirpApp` to contain all the logic for this Angular app. We'll also add in a `controller` named `mainController` that takes care of our core functionality, such as creating and displaying posts. We're going to leave these empty for now.

####chirpApp.js####
```javascript
var app = angular.module('chirpApp', []);

app.controller('mainController', function(){
});
```



We can use this in our primary view, `main.html`. This should contain a form for post creation, as well as a place to display the feed of posts. Let's scaffold everything out except for the posts display for the time being. We'll manually set the username of the poster with a text field for now, since we don't have a logged in user.

####main.html####
```html
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

Now, let's go in and connect this up to our angular app. First things first, we'll need to include the Angular files. The easiest and quickest way to grab the core files is the [Google CDN](https://docs.angularjs.org/misc/downloading). We'll also include our `chirpApp.js` file. Next, we'll add the `ng-app` directive to the top-level element of our app to bootstrap our`chirpApp` module to it. In this case, that'd be the `<body>` tag. While we're at it, we should also add  `ng-controller` directive to the top level of the main section and point it to our `mainController`.

```html
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

Now that the two are connected, we're can create objects in our `mainController` for our view to access and display. We're going to  invoke a `$scope` object as we're constructing our `mainController`. The `$scope` object is increbibly important, and is the Model part of our Model-View-Controller. It is shared between our controller and our view, and is how we can pass data and even functions between the two.

We'll attach a `posts` array to our `$scope` to store all the posts that are created. 

We'll also create a `newPost`on our `$scope` variable to store information on the post that's being created. We'll save the name of the post's creator, the text content of the post, as well as a timestamp.

We can then write a `post` function that will add the contents of `newPost` to our `posts` array whenever the "Chirp!" button is pressed. We'll also set the timestamp here. Since we want to call this from within the view, we'll attach this to the `$scope` as well.

####chirpApp.js####
```javascript
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
Now, let's start integrating and calling these from our `main.html`. We can use the `ng-model` directive to bind the properties of `newPost` to our chirp posting form. 

We can even start displaying the chirp feed now. The `ng-repeat` directive is perfect for this. When we use it with the syntax `ng-repeat = post in posts` on our, Angular will access the `posts` variable and loop through and set each to `post`. Then we can access the details of each `post` and display them. 

`post.created_by` and `post.text` are straightforward enough to display with just `{{post.created_by}}` and `{{post.text}}` since they're just text, but what about `posts.created_at`? It's just an unformatted timestamp right now, but we can format it with a filter. This can be done right in the template binding, by just specifying the format you'd like. In this case, we'll use `{{post.created_at| date:"h:mma 'on' MMM d, y"}}`

####main.html####
```html
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
	    			<div class='post' ng-repeat="post in posts">
	    			<p>{{post.created_by}} says {{post.text}} at {{post.created_at}}</p>
	    			</div>
			</div>
		</div>
	</body>
</html>
```

Okay, this is starting to work! Our page is looking pretty rough though, so let's add some formatting onto it. We'll use Bootstrap and 

