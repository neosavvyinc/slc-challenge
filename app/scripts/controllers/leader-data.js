'use strict';

/**
 * @ngdoc function
 * @name slcChallengeApp.controller:LeaderDataCtrl
 * @description
 * # LeaderDataCtrl
 * Controller of the slcChallengeApp
 */
angular.module('slcChallengeApp')
  .controller('LeaderDataCtrl', function ($scope, $routeParams, readOnly) {

    var privateScope = $scope.$new();

    function handlerBeersCheckinsMatch() {
      if (privateScope.beers && privateScope.checkIns && _.keys(privateScope.beers).length && _.keys(privateScope.checkIns).length) {
        $scope.checkIns = _(privateScope.checkIns).map(function (v, k) {
          if (_.isObject(v)) {
            v.beer = privateScope.beers[k].name;
          }
          return v;
        }).filter(_.isObject).valueOf();
        dereg();
        deregB();
      }
    }

    readOnly.beers().$bindTo(privateScope, 'beers');
    readOnly.checkIns().$bindTo(privateScope, 'checkIns');

    var dereg = privateScope.$watch('beers', handlerBeersCheckinsMatch);
    var deregB = privateScope.$watch('checkIns', handlerBeersCheckinsMatch);

    $scope.headerLinks['/leaders/' + $routeParams.name] = {
      label: 'Go to the Leaderboard',
      href: 'leaders'
    };
  });
