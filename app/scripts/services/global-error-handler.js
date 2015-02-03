'use strict';

/**
 * @ngdoc service
 * @name slcChallengeApp.globalErrorHandler
 * @description
 * # globalErrorHandler
 * Factory in the slcChallengeApp.
 */
angular.module('slcChallengeApp')
  .factory('globalErrorHandler', function (growl) {
    return function () {
      growl.danger('There was an error with the service, an email has been sent to tewen@neosavvy.com');
    };
  });
