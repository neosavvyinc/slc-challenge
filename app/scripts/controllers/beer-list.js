'use strict';

/**
 * @ngdoc function
 * @name slcChallengeApp.controller:BeerListCtrl
 * @description
 * # BeerListCtrl
 * Controller of the slcChallengeApp
 */
angular.module('slcChallengeApp')
  .controller('BeerListCtrl', function ($scope, $location, $parse, readOnly, memoize) {
    readOnly.beers().$bindTo($scope, 'beers');
    readOnly.checkIns().$bindTo($scope, 'checkIns');
    readOnly.allVotes().$bindTo($scope, 'allVotes');

    this.localState = {
      searchTerm: $parse('searchTerm')($location.search())
    };

    //Watchers
    $scope.$watch('beerListCtrl.localState.searchTerm', _.debounce(function (val) {
      $scope.$apply(function () {
        if (val) {
          $location.search('searchTerm', val);
        } else {
          $location.search('searchTerm', null);
        }
      });
    }, 200));

    //Controller Methods
    function sortObject(obj) {
      if (obj) {
        return _(obj).map(function (beer, id) {
          if (_.isObject(beer)) {
            beer.id = id;
          }
          return beer;
        }).compact().filter(_.isObject).sortBy('name').valueOf();
      }
      return obj;
    }

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
        //@TODO, these sorts could be more efficient
        return sortObject(filtered);
      }
      //@TODO, these sorts could be more efficient
      return sortObject(beers);
    };

    this.beerCheckedIn = memoize(function (id, checkIns) {
      return $scope.checkIns && $scope.checkIns[id];
    });

    this.votes = function (id) {
      var votes = $scope.allVotes ? _.result($scope.allVotes[id], 'votes') : null;
      if (votes) {
        votes += parseInt(votes) === 1 ? ' VOTE' : ' VOTES';
      }
      return votes;
    };

  });
