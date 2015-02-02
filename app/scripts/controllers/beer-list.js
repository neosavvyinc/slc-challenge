'use strict';

/**
 * @ngdoc function
 * @name slcChallengeApp.controller:BeerListCtrl
 * @description
 * # BeerListCtrl
 * Controller of the slcChallengeApp
 */
angular.module('slcChallengeApp')
  .controller('BeerListCtrl', function ($scope, $location, readOnly, memoize) {
    readOnly.beers().$bindTo($scope, 'beers');
    readOnly.checkIns().$bindTo($scope, 'checkIns');

    //Controller Methods
    this.goToBeer = function (idx) {
      $location.path('beers/' + String(idx));
    };

    this.beerCheckedIn = memoize(function (id, checkIns) {
      return $scope.checkIns && $scope.checkIns[id];
    });

  });
