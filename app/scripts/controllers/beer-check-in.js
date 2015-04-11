'use strict';

/**
 * @ngdoc function
 * @name slcChallengeApp.controller:BeerCheckInCtrl
 * @description
 * # BeerCheckInCtrl
 * Controller of the slcChallengeApp
 */
angular.module('slcChallengeApp')
  .controller('BeerCheckInCtrl', function ($scope, $location, $routeParams, readOnly, updateOnly, globalErrorHandler, growl, $timeout) {
    //Get the beer by index
    readOnly.beer($routeParams.index).$bindTo($scope, 'beer');
    readOnly.checkIn($routeParams.index).$bindTo($scope, 'checkIn');
    readOnly.vote($routeParams.index).$bindTo($scope, 'vote');

    var hasRequiredFields = function (checkIn) {
      return checkIn && checkIn.rating;
    };

    //Controller methods
    this.localState = {
      rating: 'unrated',
      checkInFields: true
    };
    this.checkInExists = function () {
      return $scope.beer && hasRequiredFields($scope.checkIn);
    };
    this.checkInNow = function (e, allow) {
      e.preventDefault();
      this.localState.checkInFields = !this.localState.checkInFields;
    };
    this.getSearchTerm = function () {
        return $location.search().searchTerm ? '?searchTerm=' + $location.search().searchTerm : '';
    };
    this.vote = function (e, voteCount) {
        e.preventDefault();
        updateOnly.vote($scope.beer, voteCount).then(function (result) {
          growl.success($scope.beer.name + ' given ' + voteCount + ' votes.');
          $location.path('/');
        }).catch(globalErrorHandler);
    };
    this.submit = function (e) {
      e.preventDefault();
      updateOnly.checkIn($scope.beer, _.pick(this.localState, ['bar', 'bartender', 'rating'])).then(function () {
        growl.success($scope.beer.name + ' checked in!');
        $location.path('/');
      }).catch(globalErrorHandler);
    };
  });
