'use strict';

/**
 * @ngdoc function
 * @name slcChallengeApp.controller:BeerCheckInCtrl
 * @description
 * # BeerCheckInCtrl
 * Controller of the slcChallengeApp
 */
angular.module('slcChallengeApp')
  .controller('BeerCheckInCtrl', function ($scope, $routeParams, readOnly) {
    readOnly.beer($routeParams.index).$bindTo($scope, 'beer');
  });
