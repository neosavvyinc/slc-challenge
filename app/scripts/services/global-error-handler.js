'use strict';

/**
 * @ngdoc service
 * @name slcChallengeApp.globalErrorHandler
 * @description
 * # globalErrorHandler
 * Factory in the slcChallengeApp.
 */
angular.module('slcChallengeApp')
  .factory('globalErrorHandler', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
