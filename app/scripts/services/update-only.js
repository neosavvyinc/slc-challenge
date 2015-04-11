'use strict';

/**
 * @ngdoc service
 * @name slcChallengeApp.updateOnly
 * @description
 * # updateOnly
 * Factory in the slcChallengeApp.
 */
angular.module('slcChallengeApp')
  .factory('updateOnly', function (simpleLogin, fbutil, $q, setHandler) {
    var updateOnly = {};

    function deleteAccordingVotes(currentVotes, newVoteCount) {
      var oldestKey;
      var totalCurrentVotes = _.reduce(currentVotes, function (sum, v, k) {
          if (_.isUndefined(oldestKey) || v['createdAt'] < currentVotes[k]['createdAt']) {
            oldestKey = k;
          }
          return sum + parseInt(v.votes);
      }, 0);
      //We can support adding this vote the normal way
      if ((totalCurrentVotes + newVoteCount) > 3) {
        currentVotes[oldestKey].votes = parseInt(currentVotes[oldestKey].votes) - 1;
        if (currentVotes[oldestKey].votes === 0) {
          delete currentVotes[oldestKey];
        }
        return deleteAccordingVotes(currentVotes, newVoteCount);
      } else {
        return currentVotes;
      }
    }

    updateOnly.username = function (name) {
      var deferred = $q.defer();
      fbutil.ref('users/' + simpleLogin.getUser().uid).
        set({name: name}, setHandler(deferred, name));
      return deferred.promise;
    };
    updateOnly.checkIn = function (beer, checkin) {
      var deferred = $q.defer();
      checkin = _.merge(checkin, {time: moment().format('x')});
      fbutil.ref('checkins/' + simpleLogin.getUser().uid + '/' + beer.$id).
        set(checkin, setHandler(deferred, checkin));
      return deferred.promise;
    };
    updateOnly.vote = function (beer, votes) {
      votes = parseInt(votes);
      if (votes > 0 && votes < 4) {
        var deferred = $q.defer(), userVotesPath = 'votes/' + simpleLogin.getUser().uid;
        fbutil.ref(userVotesPath).once('value', function (snapshot) {
          fbutil.ref(userVotesPath).set(deleteAccordingVotes(snapshot.val(), votes, []), function (err) {
              if (err) {
                deferred.reject(err);
              } else {
                fbutil.ref(userVotesPath + '/' + beer.$id).set({votes: votes, createdAt: moment().format('x')}, setHandler(deferred, votes));
              }
          });
        });
        return deferred.promise;
      } else {
        throw 'You have passed invalid votes to a service. Votes are 1-3.';
      }
    };

    return updateOnly;
  });
