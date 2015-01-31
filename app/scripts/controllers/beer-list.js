'use strict';

/**
 * @ngdoc function
 * @name slcChallengeApp.controller:BeerListCtrl
 * @description
 * # BeerListCtrl
 * Controller of the slcChallengeApp
 */
angular.module('slcChallengeApp')
  .controller('BeerListCtrl', function ($scope, $location, readOnly) {
    $scope.readOnly = readOnly;
    $scope.goToBeer = function (idx) {
      $location.path('beers/' + String(idx));
    };

  });
