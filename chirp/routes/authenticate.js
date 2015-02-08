var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
var passport = global.passport;

router.route('/signup')

	.post(function(req, res){

		if(!req.body.username || !req.body.password){
			return res.send(400, {message: 'must supply json body with fields user_name and password '});
		}

		var user = new User();
		user.user_name = req.body.user_name;

		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(req.body.password, salt, function(err, hash) {
		        user.password = hash;

		        user.save(function(err, user){
		        	if(err){
		        		return res.send(500, {message:err});
		        	}

		        	return res.send(200);
		        });
		    });
		});
	});


router.route('/login')

	/* .post(passport.authenticate('local'),
		function(req, res){
			res.send(200);
		}
	); */
	.post(passport.authenticate('local', { successRedirect: '/', failureRedirect: '/#/auth' }));

module.exports = router;