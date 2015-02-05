'use strict';

/**
 * @ngdoc filter
 * @name slcChallengeApp.filter:timeDisplay
 * @function
 * @description
 * # timeDisplay
 * Filter in the slcChallengeApp.
 */
angular.module('slcChallengeApp')
  .filter('timeDisplay', function () {
    return function (input) {
      if (input) {
        input = moment(input).fromNow();
      }
      return input;
    };
  });
