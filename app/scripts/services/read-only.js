'use strict';

/**
 * @ngdoc service
 * @name slcChallengeApp.readOnly
 * @description
 * # readOnly
 * Factory in the slcChallengeApp.
 */
angular.module('slcChallengeApp')
  .factory('readOnly', function ($rootScope, $q, fbutil, simpleLogin) {

    var readOnly = {};

    readOnly.beers = function () {
      return fbutil.syncObject('beers');
    };
    readOnly.beer = function (idx) {
        return fbutil.syncObject('beers/' + String(idx));
    };
    readOnly.checkIns = function () {
      return fbutil.syncObject('checkins/' + simpleLogin.getUser().uid);
    };
    readOnly.checkIn = function (beerId) {
      return fbutil.syncObject('checkins/' + simpleLogin.getUser().uid + '/' + beerId);
    };
    readOnly.allUsers = function () {
      var deferred = $q.defer(), users, checkIns;
      var doResolve = function (users, checkIns) {
          if (users && checkIns) {
            _.each(users, function (u, id) {
              u.id = id;
              //This collection is 1 larger than the actual number of checkins
              u.checkInsLength = _(checkIns[id]).values().compact().valueOf().length;
            });
            deferred.resolve(users);
          }
      };
      fbutil.ref('users').once('value', function (snapshot) {
        users = snapshot.val();
        doResolve(users, checkIns);
      });
      fbutil.ref('checkins').once('value', function (snapshot) {
        checkIns = snapshot.val() || {};
        doResolve(users, checkIns);
      });
      return deferred.promise;
    };

    return readOnly;
  });
