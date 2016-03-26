


  angular.module('ISS', ['ngRoute'])
  .config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      // routes
      $routeProvider
        .when("/", {
          templateUrl: "./partials/partial1.html",
          controller: "MainController"
        })
        .otherwise({
           redirectTo: '/'
        });
    }
  ]);

  //Load controller
  angular.module('ISS')

  .controller('MainController', function($scope, $http) {

    $scope.searchInit = function() {

      $scope.loading = true;

      $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.location + '&key=AIzaSyCLH--06Xt3eiKJSL3QOANF0qNZh_KdvtA')

      .then(function(response) {

        $scope.loading = false;

        var lat = response.data.results[0].geometry.location.lat,
            lon = response.data.results[0].geometry.location.lng;

        requestISSPass(lat, lon);
        

      });
    }, 
    requestISSPass = function(lat, lon) {

      $http.get('http://api.open-notify.org/iss-pass.json?lat=' + lat + '&lon=' +lon).

      then(function(response) {

        console.log(response)

      });


    }



  });
