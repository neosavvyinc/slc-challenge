'use strict';

/**
 * @ngdoc service
 * @name slcChallengeApp.readOnly
 * @description
 * # readOnly
 * Factory in the slcChallengeApp.
 */
angular.module('slcChallengeApp')
  .factory('readOnly', function ($rootScope, fbutil, simpleLogin) {

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

    return readOnly;
  });
