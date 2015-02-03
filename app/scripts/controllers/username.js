'use strict';

/**
 * @ngdoc function
 * @name slcChallengeApp.controller:UsernameCtrl
 * @description
 * # UsernameCtrl
 * Controller of the slcChallengeApp
 */
angular.module('slcChallengeApp')
  .controller('UsernameCtrl', function ($scope, $location, readOnly, updateOnly, globalErrorHandler, memoize) {
    readOnly.allUsers().then(function (users) {
      this.localState.allUsers = users;
    }.bind(this));

    this.localState = {
      username: ''
    };

    var foundUser = memoize(function (allUsers, username) {
      return _.find(allUsers, function (u) {
        return u.name === username;
      });
    });

    var usernameState = function () {
      if (this.localState.allUsers && this.localState.username) {
        if (foundUser(this.localState.allUsers, this.localState.username)) {
          return '2';
        } else {
          return '0';
        }
      }
      return '1';
    }.bind(this);

    //Controller methods
    this.buttonClass = function () {
      return {'0': 'btn-success', '1': 'btn-warning', '2': 'btn-danger'}[usernameState()];
    };

    this.buttonLabel = function () {
      return {'0': 'Confirm Username', '1': 'Choose Username', '2': 'Username is Already Taken'}[usernameState()];
    };

    this.submit = function (e) {
      e.preventDefault();
      if (usernameState() === '0') {
        updateOnly.username(this.localState.username).then(function () {
            $location.path('/leaders');
        }).catch(globalErrorHandler);
      }
    }
  });
