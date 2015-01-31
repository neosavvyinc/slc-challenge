'use strict';

/**
 * @ngdoc service
 * @name slcChallengeApp.readOnly
 * @description
 * # readOnly
 * Factory in the slcChallengeApp.
 */
angular.module('slcChallengeApp')
  .factory('readOnly', function ($rootScope, fbutil) {

    var readOnly = $rootScope.$new();

    fbutil.syncObject('beers').$bindTo(readOnly, 'beers');
    readOnly.beer = function (idx) {
        return fbutil.syncObject('beers/' + String(idx));
    };

    return readOnly;
  });
