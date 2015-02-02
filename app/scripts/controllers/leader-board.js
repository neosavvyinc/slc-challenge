'use strict';

/**
 * @ngdoc function
 * @name slcChallengeApp.controller:LeaderBoardCtrl
 * @description
 * # LeaderBoardCtrl
 * Controller of the slcChallengeApp
 */
angular.module('slcChallengeApp')
  .controller('LeaderBoardCtrl', function ($scope, simpleLogin, readOnly, globalErrorHandler) {
    readOnly.allUsers().then(function (users) {
      $scope.users = users;
    }).catch(globalErrorHandler);

    //Controller Methods
    this.currentUser = simpleLogin.getUser();
    this.leaderBoardOrdering = function (users) {
      if (users) {
        return _(users).values().compact().sortBy('-checkInsLength').valueOf();
      }
      return users;
    };

  });
