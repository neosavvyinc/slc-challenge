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
  'simpleLogin',
  'angular-growl',
  'autocomplete'
]).config(function (growlProvider) {
  growlProvider.globalTimeToLive({success: 1800, danger: 5000});
  growlProvider.globalDisableCloseButton(true);
  growlProvider.globalDisableIcons(true);
  growlProvider.globalDisableCountDown(true);
  growlProvider.globalPosition('top-center');
}).run(function ($rootScope, $location, growl) {
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

if (window.location.origin.match('slcchallenge.firebaseapp.com')) {
  alert('Thanks for helping us test this application. Because the challenge is for ng-conf, existing check-ins (but not user accounts) will be cleared at 5:00PM RMT on March 4th.');
}
