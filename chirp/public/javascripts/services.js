var status = require('http-status');

exports.$posts = function($http) {
  var p = {};

  p.loadPosts = function() {
    $http.get('/api/posts')
          .success(function(data) {
            p.results = data;
          })
          .error(function(data, $status) {
            if($status === status.INTERNAL_SERVER_ERROR || status.NOT_FOUND) {
              p.results = null;
            }
          })
  }

  p.loadPosts();

  return p;
}