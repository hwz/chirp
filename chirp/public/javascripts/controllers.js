exports.mainController = function(postService, $scope, $rootScope, $http, $routeParams) {
  $scope.posts = postService.query();
  $scope.newPost = { created_by: '', text: '', created_at: '' };

  $scope.post = function() {
    $scope.newPost.created_by = $rootScope.current_user;
    $scope.newPost.created_at = Date.now();
    postService.save($scope.newPost, function() {
      $scope.posts = postService.query();
      $scope.newPost = { created_by: '', created_at: '' }
    })
  }

    $scope.delete = function(idx) {
      var post_to_delete = $scope.posts;
    $http.delete('/api/posts/' + { id: post_to_delete.id })
          .success(function(data) {
            $scope.posts(idx, 1)
          })
  }

}


exports.authController = function($scope, $http, $rootScope, $location) {
  $scope.user = { username: '', password: ''};
  $scope.error_message = '';
  
  $scope.login = function() {
      $http.post('/auth/login', $scope.user)
        .success(function(data) {
          if(data.state === 'success') {
            $rootScope.authenticated = true;
            $rootScope.current_user = data.user.username;
            $location.path('/')
          } else {
            $scope.error_message = data.message;
          }
          
        })
  }

  $scope.register = function() {
    $http.post('/auth/signup', $scope.user)
          .success(function(data) {
            if(data.state === 'success') {
                $rootScope.authenticated = true;
              $rootScope.current_user = data.user.username;
              $location.path('/')
            } else {
              $scope.error_message = data.message;
            }
         
          })
  }

}