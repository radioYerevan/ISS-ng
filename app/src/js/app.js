


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
      //need to turn location into lat/lon
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.location + '&key=AIzaSyCLH--06Xt3eiKJSL3QOANF0qNZh_KdvtA';

      $http.get(url)

      .then(function(response) {

        $scope.loading = false;
        //there could be any number of results, (5 cities named Paris for example), we're just going to grab the first one
        var lat = response.data.results[0].geometry.location.lat,
            lon = response.data.results[0].geometry.location.lng;

        requestISSPass(lat, lon);
        

      });
    }, 
    requestISSPass = function(lat, lon) {

      $http.jsonp('http://api.open-notify.org/iss-pass.json?lat=' + lat + '&lon=' + lon + '&n=1' + '&callback=JSON_CALLBACK').

      success(function(data) {

       var time = data.response[0].risetime;

        console.log()

      });


    }



  });
