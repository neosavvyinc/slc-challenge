'use strict';

/**
 * @ngdoc service
 * @name slcChallengeApp.haveUsername
 * @description
 * # haveUsername
 * Factory in the slcChallengeApp.
 */
angular.module('slcChallengeApp')
  .factory('haveUsername', function (readOnly, simpleLogin, $parse, $q, $rootScope, $location) {
    return function () {
      //@TODO, could be refactored to be a just a bit cleaner
      var deferred = $q.defer();
      var privateScope = $rootScope.$new();
      var de = privateScope.$watch('user', function (val) {
        if (val) {
          if (val.name) {
            deferred.resolve(val);
          } else {
            deferred.reject(val);
          }
          de();
        }
      });
      readOnly.user($parse('uid')(simpleLogin.getUser())).$bindTo(privateScope, 'user');
      return deferred.promise;
    }
  });
