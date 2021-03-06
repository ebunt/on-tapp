'use strict';

//Setting up route
angular.module('nearby').config(['$stateProvider', 'uiGmapGoogleMapApiProvider',
  function($stateProvider, uiGmapGoogleMapApiProvider) {
    // Nearby state routing
    $stateProvider.
    state('nearby', {
      url: '/nearby',
      templateUrl: 'modules/nearby/views/nearby.client.view.html'
    });

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAQHm36O2gZr34HkBjElKYHox3LVWR8UWY',
      v: '3.17',
      libraries: 'geometry,visualization'
    });
  }
]);
