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
    this.localState = {
      searchTerm: ''
    };

    this.goToBeer = function (idx) {
      $location.path('beers/' + String(idx));
    };

    this.searchFiltered = function (beers, searchTerm) {
      if (beers && searchTerm) {
        var filtered = {};
        var lcSearchTerm = searchTerm.toLowerCase();
        _.each(beers, function (beer, id) {
          if (beer) {
            var combine = beer.name + beer.brewery;
            if (combine && combine.toLowerCase().indexOf(lcSearchTerm) !== -1) {
              filtered[id] = beer;
            }
          }
        });
        return filtered;
      }
      return beers;
    };

    this.beerCheckedIn = memoize(function (id, checkIns) {
      return $scope.checkIns && $scope.checkIns[id];
    });

  });
