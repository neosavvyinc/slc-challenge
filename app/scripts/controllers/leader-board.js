'use strict';

/**
 * @ngdoc function
 * @name slcChallengeApp.controller:LeaderBoardCtrl
 * @description
 * # LeaderBoardCtrl
 * Controller of the slcChallengeApp
 */
angular.module('slcChallengeApp')
  .controller('LeaderBoardCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
