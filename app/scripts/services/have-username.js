'use strict';

/**
 * @ngdoc service
 * @name slcChallengeApp.haveUsername
 * @description
 * # haveUsername
 * Factory in the slcChallengeApp.
 */
angular.module('slcChallengeApp')
  .factory('haveUsername', function (readOnly, simpleLogin, $parse, $q, $rootScope, DSCacheFactory) {
    var cache = DSCacheFactory('haveUsername');
    return function () {
      //@TODO, could be refactored to be a just a bit cleaner
      var deferred = $q.defer();
      var uid = $parse('uid')(simpleLogin.getUser());
      //Simple angular caching here
      if (cache.get(uid)) {
        deferred.resolve(cache.get(uid));
      } else {
        var privateScope = $rootScope.$new();
        var de = privateScope.$watch('user', function (val) {
          if (val) {
            if (val.name) {
              cache.put(uid, val);
              deferred.resolve(val);
            } else {
              deferred.reject(val);
            }
            de();
          }
        });
        readOnly.user(uid).$bindTo(privateScope, 'user');
      }
      return deferred.promise;
    }
  });
