var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Post = mongoose.model('Post');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chirp!' });
});

router.route('/api/posts')
	//creates a new post
	.post(function(req, res){
		var newPost = new Post();
		newPost.text = req.body.text;
		newPost.created_by = req.body.created_by;
		newPost.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'new post!' });
		});
	})
	//gets all posts
	.get(function(req, res){
		Post.find(function(err, posts){
			if(err)
				res.send(err);
			res.json(posts);
		});
	});

// with u_ids. probably wont be needed but i like fully fleshed out rest :)
router.route('/api/posts/:id')
	//gets specified post
	.get(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err)
				res.send(err);
			res.json(post);
		});
	})
	//updates specified post
	.put(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err)
				res.send(err);
			
			post.created_by = req.body.created_by;
			post.text = req.body.text;

			post.save(function(err){
				if(err)
					res.send(err);

				res.json('updated this post');
			});
		});
	})
	.delete(function(req, res) {
		Post.remove({
			_id: req.params.id
		}, function(err, post) {
			if (err)
				res.send(err);

			res.json({ message: 'post deleted' });
		});
	});

module.exports = router;
