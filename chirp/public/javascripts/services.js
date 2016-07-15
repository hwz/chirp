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

// exports.authenticationService = function($http, $q, $window) {
//   var userInfo;

//   function login(userName, password) {
//     var deferred = $q.defer();

//     $http.post('/auth/login', {
//       userName: username,
//       password: password
//     })
//     .then(function(result) {
//       userInfo = {
//         accessToken: result.data.access_token,
//         userName: result.data.userName
//       };
//       $window.sessionStorage['userInfo'] = JSON.stringify(userInfo);
//       deferred.resolve(userInfo);
//     }, function(err) {
//       deferred.reject(err)
//     })
//     return deferred.promise;
//   }

//   return {
//     login: login
//   }
// };