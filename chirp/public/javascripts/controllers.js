exports.mainController = function($posts, $scope, $rootScope, $http, $routeParams) {
  $scope.posts = $posts;
  $scope.newPost = { 
    created_by: '', 
    text: '', 
    created_at: '' 
  };

  $scope.post = function() {
    $scope.newPost.created_by = $rootScope.current_user;
    $scope.newPost.created_at = Date.now();
    $http.post('/api/posts', $scope.newPost)
          .success(function(data) {
            $posts.loadPosts();
            $scope.newPost = { created_by: '', created_at: ''}
          }) 
  }

  $scope.delete = function($posts) {
    $http.delete('/api/posts/' + $posts._id)
          .success(function(data) {
           // delete element from DOM
            
          })

  }
  



};// End of mainController

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

};