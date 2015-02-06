'use strict';

/**
 * @ngdoc function
 * @name slcChallengeApp.controller:LeaderDataCtrl
 * @description
 * # LeaderDataCtrl
 * Controller of the slcChallengeApp
 */
angular.module('slcChallengeApp')
  .controller('LeaderDataCtrl', function ($scope, $routeParams, readOnly, globalErrorHandler) {

    var privateScope = $scope.$new();

    function handlerBeersCheckinsMatch() {
      if (privateScope.beers && privateScope.users && _.keys(privateScope.beers).length && _.keys(privateScope.users).length) {
        $scope.checkIns = _.map(_.find(privateScope.users, {name: $routeParams.name}).checkIns, function (checkIn) {
          checkIn.beer = privateScope.beers[checkIn.beerId];
          return checkIn;
        });
        dereg();
        deregB();
      }
    }

    readOnly.allUsers().then(function (users) {
      privateScope.users = users;
    }).catch(globalErrorHandler);
    readOnly.beers().$bindTo(privateScope, 'beers');

    var dereg = privateScope.$watch('beers', handlerBeersCheckinsMatch);
    var deregB = privateScope.$watch('users', handlerBeersCheckinsMatch);

    $scope.headerLinks['/leaders/' + $routeParams.name] = {
      label: 'Go to the Leaderboard',
      href: 'leaders'
    };
  });
