var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	if (req.isAuthenticated())
		return next();

	// if the user is not authenticated then redirect him to the login page
	res.redirect('/auth');
}

module.exports = function(passport){

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/#/',
		failureRedirect: '/#/auth'
	}));

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/#/',
		failureRedirect: '/#/auth'
	}));

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/#/');
	});



	return router;
}


// var express = require('express');
// var router = express.Router();
// var mongoose = require( 'mongoose' );
// var Post = mongoose.model('Post');
// var User = mongoose.model('User');
// var bcrypt = require('bcrypt');
// var passport = global.passport;

// router.route('/signup')

// 	.post(function(req, res){

// 		if(!req.body.username || !req.body.password){
// 			return res.send(400, {message: 'must supply json body with fields user_name and password '});
// 		}

// 		var user = new User();
// 		user.user_name = req.body.user_name;

// 		bcrypt.genSalt(10, function(err, salt) {
// 		    bcrypt.hash(req.body.password, salt, function(err, hash) {
// 		        user.password = hash;

// 		        user.save(function(err, user){
// 		        	if(err){
// 		        		return res.send(500, {message:err});
// 		        	}
// 		        	return res.send(200);
// 		        });
// 		    });
// 		});
// 	});


// router.route('/login')

// 	 .post(passport.authenticate('local'),
// 		function(req, res){
// 			if(!req.body.username || !req.body.password){
// 				return res.send(400, {message: 'must supply json body with fields user_name and password '});
// 			}

// 			res.send(200);
// 			console.log("signed in");
// 		}
// 	); 
// 	// .post(passport.authenticate('local', { successRedirect: '/#/', failureRedirect: '/#/login' }));

// module.exports = router;