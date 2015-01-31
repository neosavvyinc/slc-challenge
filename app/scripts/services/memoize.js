'use strict';

/**
 * @ngdoc service
 * @name slcChallengeApp.memoize
 * @description
 * # memoize
 * Value in the slcChallengeApp.
 */
angular.module('slcChallengeApp')
  .value('memoize', function (fn) {
    return _.memoize(fn, function () {
      return JSON.stringify(arguments);
    });
  });

