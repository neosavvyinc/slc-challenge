'use strict';

/**
 * @ngdoc service
 * @name slcChallengeApp.setHandler
 * @description
 * # setHandler
 * Value in the slcChallengeApp.
 */
angular.module('slcChallengeApp')
  .value('setHandler', function (deferred, resolveObject) {
    return function (err) {
      err ? deferred.reject(err) : deferred.resolve(resolveObject);
    };
  });
