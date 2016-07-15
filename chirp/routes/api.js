var express = require('express');
var status = require('http-status');

module.exports = function(wagner) {

  var router = express.Router();

  function isAuthenticated (req, res, next) {
 
  if(req.method === "GET"){
    return next();
  }

  if (req.isAuthenticated()){
    return next();
  }

  return res.redirect('/#login');
  };

  router.use('/posts', isAuthenticated);

  router.route('/posts')

    .post(wagner.invoke(function(Post) {
      return function(req, res) {

        var post = new Post();
        post.text = req.body.text;
        post.created_by = req.body.created_by;
        post.save(function(err, post) {
          if(err) {
            return res.status(status.INTERNAL_SERVER_ERROR)
                      .json({ error: err.toString() })
          }

          res.json(post)
        })
      }
    }))

    .get(wagner.invoke(function(Post) {
      return function(req, res) {
        Post.find(function(err, posts) {
          if(err) {
            return res.status(status.INTERNAL_SERVER_ERROR)
                      .json({ error: err.toString() })
          }

          res.json(posts);
        })
      }
    }));

  router.route('/posts/:id')

    .get(wagner.invoke(function(Post) {
      return function(req, res) {
        Post.findById(req.params.id, function(err, post) {
          if(err) {
            return res.status(status.INTERNAL_SERVER_ERROR)
                      .json({ error: err.toString() })
          }

          res.json(post)
        })
      }
    }))

    .delete(wagner.invoke(function(Post) {
      return function(req, res) {
        Post.remove({ _id: req.params.id }, function(err, post) {
          if(err) {
            return res.status(status.INTERNAL_SERVER_ERROR)
                      .json({ error: err.toString() })
          }
          res.json({ message: 'Successfully deleted!'})
        })
      }
    }))

 
  return router;

};