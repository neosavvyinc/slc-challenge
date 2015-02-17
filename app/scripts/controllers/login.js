'use strict';
/**
 * @ngdoc function
 * @name slcChallengeApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('slcChallengeApp')
  .controller('LoginCtrl', function ($scope, simpleLogin, $location, $parse, $timeout) {
    $scope.oauthLogin = function (provider) {
      $scope.err = null;
      simpleLogin.login(provider, {rememberMe: true}).then(oAuthRedirect, showError);
    };

    $scope.anonymousLogin = function () {
      $scope.err = null;
      simpleLogin.anonymousLogin({rememberMe: true}).then(redirect, showError);
    };

    $scope.passwordLogin = function (email, pass) {
      $scope.err = null;
      simpleLogin.passwordLogin({email: email, password: pass}, {rememberMe: true}).then(
        redirect, showError
      );
    };

    $scope.createAccount = function (email, pass, confirm) {
      $scope.err = null;
      if (!pass) {
        $scope.err = 'Please enter a password';
      }
      else if (pass !== confirm) {
        $scope.err = 'Passwords do not match';
      }
      else {
        simpleLogin.createAccount(email, pass, {rememberMe: true})
          .then(redirect, showError);
      }
    };

    function oAuthRedirect() {
      $location.path('/username');
    }

    function redirect() {
      $location.path('/leaders');
    }

    function showError(err) {
      $scope.err = err;
    }

    //Initialization in the redirect case
    function checkLogin(attempt) {
      if (attempt < 10) {
        $timeout(function () {
          if ($parse('auth.uid')(simpleLogin.getUser())) {
            oAuthRedirect();
          } else {
            checkLogin(attempt++);
          }
        }, 1000);
      }
    }

    checkLogin(0)

  });
