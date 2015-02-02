'use strict';

/**
 * @ngdoc overview
 * @name slcChallengeApp
 * @description
 * # slcChallengeApp
 *
 * Main module of the application.
 */
angular.module('slcChallengeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.utils',
    'simpleLogin'
  ]).run(function ($rootScope, $location) {
    $rootScope.$location = $location;
    $rootScope.headerLinks = {
      '/beers': {
        label: 'Go to the Leaderboard',
        href: 'leaders'
      },
      '/leaders': {
        label: 'Go to the Beer List',
        href: 'beers'
      }
    };
});
