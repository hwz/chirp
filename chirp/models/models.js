var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/test');

  var User = mongoose.model('User', require('./userSchema'), 'users');

  var Post = mongoose.model('Post', require('./postSchema'), 'posts');

  var model = {
    User: User,
    Post: Post
  }

  _.each(model, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return model;
}
