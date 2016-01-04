exports.postService = function($resource) {
  return $resource('/api/posts/:id');
}