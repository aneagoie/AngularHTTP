var app = angular.module('app', []);

app.controller('MainController', function($scope, $http){
  $scope.getFromAPI = function(){
    $http({method: 'GET', url: 'https://api.github.com/users/angular'})
    //or you can do:
    //$http.get('url', data); data is for POST request
    .success(function(data, status, headers, config){
      //success
      console.log('success', status);
      console.log(data);
    })
    .error(function(data, status, headers, config){
      //error
      console.log('error!', status);
      console.log(data);
    });
  };
});

//if you want to customize defaults such as header for POST
app.config(function($httpProvider){
  console.log($httpProvider.defaults.headers.post);
});
//$resource service is sitting on top of the $http service.
//$resource is used to consume REST APIs. You can talk to any type and style of REST

var app = angular.module('app', ['app.angularGit']);
app.controller('MainController', function($scope, AngularGit){
  var params = {category: 'commits', sha: ''};
  console.log(AngularGit.get(params));
  // .get is a default $resource method. others are:
  // .save - POST
  // .query - GET, isArray:true
  console.log(AngularGit.query(params));
  // .remove - DELETE
  // .delete - DELETE
});

//ngResource is its own separate module. So you must inject it.
//$resouce will act as a gateway to the API, and will spit out an object with you request.
//AngularGit will interact with the github API
angular.module('app.angularGit', ['ngResource'])
  .factory('AngularGit', function($resource){
    //this is where all data from our API will be retrieved.
    return $resource('https://api.github/com/repos/angular/angular.js/:category/:sha');
  });



