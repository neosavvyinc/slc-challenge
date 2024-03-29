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
    readOnly.bars().then(function (bars) {
      $scope.bars = bars;
    });

    var hasRequiredFields = function (checkIn) {
      return checkIn && checkIn.bar && checkIn.bartender;
    };

    //Watchers
    var de = $scope.$watch('beer', function (val) {
      if (val && !val.image) {
        this.localState.checkInFields = true;
        de();
      }
    }.bind(this));

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
    this.getReferenceLabel = function (beer) {
      if (beer) {
        if (beer.image && beer.description) {
          return '*Image & Description:';
        } else if (beer.image) {
          return '*Image:';
        } else if (beer.description) {
          return '*Description:';
        }
      }
      return '';
    };
    this.submit = function (e) {
      e.preventDefault();
      updateOnly.checkIn($scope.beer, _.pick(this.localState, ['bar', 'bartender', 'type'])).then(function () {
        growl.success($scope.beer.name + ' checked in!');
        $location.path('/');
      }).catch(globalErrorHandler);
    };
  });
