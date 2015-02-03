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

    var hasRequiredFields = function (checkIn) {
        return checkIn && checkIn.bar && checkIn.bartender;
    };

    //Controller methods
    this.localState = {
      checkInFields: false
    };
    this.checkInExists = function () {
      return $scope.beer && hasRequiredFields($scope.checkIn);
    };
    this.checkInNow = function (e, allow) {
      e.preventDefault();
      this.localState.checkInFields = !this.localState.checkInFields;
    };
    this.submit = function (e) {
      e.preventDefault();
      updateOnly.checkIn($scope.beer, _.pick(this.localState, ['bar', 'bartender', 'type'])).then(function () {
        growl.success($scope.beer.name + ' checked in!', {ttl: -1});
        $location.path('/');
      }).catch(globalErrorHandler);
    };
  });
