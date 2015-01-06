'use strict';

angular.module('nearby').controller('NearbyController', ['$scope', 'Breweries', 'geolocation', '$stateParams', 'uiGmapLogger', '$anchorScroll', '$location',
	function($scope, Breweries, geolocation, $stateParams, uiGmapLogger, $anchorScroll, $location) {

    // enable logging of google map info and error
    uiGmapLogger.doLog = true;

    // this array would be used to fetch data from brewerydb factory
    $scope.breweries = [];

    // an object to story user's current coordinate,
    $scope.coords = {};

    // pushing breweries data from $http request and place markers
    var handleSuccess = function(data, status){
      $scope.breweries = data.data;
      placeMarker();
    };

    // function to access users geolocation coordinates
    geolocation.getLocation().then(function(data){
      // get user coordinates
      // $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};

      // set to san francisco by Default for Victor
      $scope.coords = {lat:37.7833, long:-122.4167};

      $scope.map = { center: { latitude: $scope.coords.lat, longitude: $scope.coords.long }, zoom: 12};

      // add maker for current location
      curLocationMarker();

      // get Breweries data from factory
      Breweries.getData($scope.coords).success(handleSuccess);
    });

    // marker for current coordinate
    var curLocationMarker = function(){
      $scope.marker = {
        id: 'curLoc',
        coords: {
          latitude: $scope.coords.lat,
          longitude: $scope.coords.long,
        },
        options: {
          title: 'You are here',
          animation: 'DROP'
        }
      };
    };

      $scope.clickEventsObject = {
        mouseover: function(marker, e, model)  {
          model.mouseOver();
        },
        mouseout: function(marker, e, model)  {
          model.mouseOut();
        }
      };

      // var markerMouseOver =

      // var markerMouseOut =

    // an array to store all breweries marker
    $scope.allMarkers = [];

    // create markers for all breweries
    var createMarker = function (i, lat, lng, name, breweryId) {
      var ret = {
        id: i,
        breweryId: breweryId,
        latitude: lat,
        longitude: lng,
        title: name,
        icon: '/modules/nearby/images/beer-icon.png',
        show: false
      };
      ret.onClick = function() {
        ret.show = !ret.show;
      };
      ret.mouseOver = function(){
        ret.show = !ret.show;
        $scope.gotoAnchor(breweryId);
      };
      ret.mouseOut = function(){
        ret.show = !ret.show;
      };

      return ret;
    };

    // a function to place all breweries markers
    var placeMarker = function(){

      var markers = [];
      for (var i = 0; i < $scope.breweries.length; i++) {
        var lat = $scope.breweries[i].latitude;
        var lng = $scope.breweries[i].longitude;
        var name = $scope.breweries[i].brewery.name;
        var breweryId = $scope.breweries[i].brewery.id;

        markers.push(createMarker(i, lat, lng, name, breweryId));
      }

      $scope.allMarkers = markers;
    };

    $scope.gotoAnchor = function(x) {
      var newHash = 'anchor' + x;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash('anchor' + x);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    };
  }
]);

angular.module('nearby').run(['$anchorScroll', function($anchorScroll) {
  $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}])
