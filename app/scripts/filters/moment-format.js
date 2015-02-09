'use strict';

/**
 * @ngdoc filter
 * @name slcChallengeApp.filter:momentFormat
 * @function
 * @description
 * # momentFormat
 * Filter in the slcChallengeApp.
 */
angular.module('slcChallengeApp')
  .filter('momentFormat', function () {
    return function (input, format) {
      return moment(input, 'x').format(format);
    };
  });
