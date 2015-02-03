'use strict';

/**
 * @ngdoc function
 * @name slcChallengeApp.controller:UsernameCtrl
 * @description
 * # UsernameCtrl
 * Controller of the slcChallengeApp
 */
angular.module('slcChallengeApp')
  .controller('UsernameCtrl', function ($scope, readOnly, memoize) {
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
    };

    //Controller methods
    this.buttonClass = function () {
      return {'0': 'btn-success', '1': 'btn-warning', '2': 'btn-danger'}[usernameState()];
    };

    this.buttonLabel = function () {
      if (this.localState.allUsers && username) {
        if (foundUser(this.localState.allUsers, username)) {
          return 'Username is Already Taken';
        } else {
          return 'Confirm Username';
        }
      } else {
        return 'Choose Username';
      }
    };
  });
