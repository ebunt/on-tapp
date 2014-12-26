angular.module('onTappApp.ratings', [])

  .controller('RatingsController', ['$scope', 'breweries', function($scope, breweries) {
    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
      {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    ];

    $scope.myInterval = 0;

    var slides = $scope.slides = [];

    $scope.addSlide = function() {
      var newWidth = 600 + slides.length + 1;

      for (var i = 0; i < breweries.breweries.length; i++) {
          slides.push({
          image: 'data:image/gif;base64,R0lGODlhAQABAIAAAGZmZgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
          text: breweries.breweries[i].name
        });
      }
    };

    $scope.addSlide();

    $scope.saveRating = function(){
      var brewery = breweries.breweries[0];
      brewery.ratings = $scope.percent;
    };
  }]);