'use strict';

/**
 * @ngdoc service
 * @name slcChallengeApp.updateOnly
 * @description
 * # updateOnly
 * Factory in the slcChallengeApp.
 */
angular.module('slcChallengeApp')
  .factory('updateOnly', function (simpleLogin, fbutil, $q, setHandler) {
    var updateOnly = {};

    updateOnly.username = function (name) {
      var deferred = $q.defer();
      fbutil.ref('users/' + simpleLogin.getUser().uid).
        set({name: name}, setHandler(deferred, name));
      return deferred.promise;
    };
    updateOnly.checkIn = function (beer, checkin) {
      var deferred = $q.defer();
      checkin = _.merge(checkin, {time: moment().format('x')});
      fbutil.ref('checkins/' + simpleLogin.getUser().uid + '/' + beer.$id).
        set(checkin, setHandler(deferred, checkin));
      return deferred.promise;
    };

    return updateOnly;
  });
