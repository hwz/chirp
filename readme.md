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

####index.html####
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
					<textarea required maxlength="200" rows="3" placeholder="Say something" />
					<input class="button" type="submit" value="Chirp!" />
				</form>
			</div>
			<div id="post-stream">
				<h4>Chirp Feed</h4>
        			<!--to be populated by Angular-->
				</div>
			</div>
		</div>
	</body>
</html>
```

Now, let's go in and connect this up to our angular app. First things first, we'll need to include the Angular files. The easiest and quickest way is the [Google CDN](https://docs.angularjs.org/misc/downloading).  Next, we'll add the `ng-app` directive to the top-level element of our app to bootstrap our`chirpApp` module to it. In this case, that'd be the `<body>` tag. While we're at it, we should also add  `ng-controller` directive to the top level of the main section and point it to our `mainController`.

```html
<!doctype html>
<html>
	<head>
		<title>Chirp</title>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.min.js"></script>
	</head>
	<body ng-app="chirpApp">
		<div id='main' ng-controller="mainController">
				...
		</div>
	</body>
</html>
```

Now that the two are connected, we're can create objects in our `mainController` for our view to access and display. We're going to  invoke a `$scope` object as we're constructing our `mainController`. The `$scope` object is increbibly important, and is the Model part of our Model-View-Controller. It is shared between our controller and our view, and is how we can pass data and even functions between the two. We'll attach a `posts` array to our `$scope` to 