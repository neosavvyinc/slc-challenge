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
  'autocomplete',
  'angular-data.DSCacheFactory'
]).config(function (growlProvider, DSCacheFactoryProvider) {
  growlProvider.globalTimeToLive({success: 1800, danger: 5000, warning: 10000});
  growlProvider.globalDisableCloseButton(true);
  growlProvider.globalDisableIcons(true);
  growlProvider.globalDisableCountDown(true);
  growlProvider.globalPosition('top-center');

  function toMs(minutes) {
      return minutes * 60 * 1000;
  }

  DSCacheFactoryProvider.setCacheDefaults({
    maxAge: toMs(15),
    //@TODO, this may have trouble with some phones, keep an eye out
    storageMode: 'localStorage'
  });
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
    },
    '/about': {
      label: 'Back to Beer List',
      href: 'beers'
    }
  };
  
});
