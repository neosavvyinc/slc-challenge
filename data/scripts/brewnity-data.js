(function () {

  var _ = require('lodash');
  require('lodash-math')(_);
  var Firebase = require('firebase');
  var ref = new Firebase('https://brewnity.firebaseio.com/');

  //Highest rated beer
  //Lowest rated beer
  function highestLowestRatedBeer(checkins, beers) {
    var ratings = _(checkins).values().compact().reduce(function (sum, v) {
      return sum.concat(_(v).map(function (v, k) {
        if (_.isObject(v)) {
          v.id = k;
        }
        return v;
      }).compact().reject(function (r) {
        return r.rating == 'unrated';
      }).valueOf());
    }, []).valueOf();
    var beersToRatings = {}, averages = {};
    _.each(ratings, function (r) {
      if (!beersToRatings[r.id]) {
        beersToRatings[r.id] = [];
      }
      beersToRatings[r.id].push(parseFloat(r.rating));
    });
    console.log(beersToRatings);
    _.each(beersToRatings, function (v, k) {
      averages[k] = _.reduce(v, function (sum, r) {
        return sum + r;
      }, 0) / v.length;
    });
    var scores = _(averages).map(function (v, k) {
      return {avg: v, id: k};
    }).sortBy('avg').valueOf();
    console.log(scores);
    return {lowest: beers[_.first(scores).id], highest: beers[_.last(scores).id]};
  }

  //Most frequently rated beer
  function mostFreqentlyRatedBeer(checkins, beers) {
    var ratings = _(checkins).values().compact().reduce(function (sum, v) {
      return sum.concat(_(v).map(function (v, k) {
        if (_.isObject(v)) {
          v.id = k;
        }
        return v;
      }).compact().reject(function (r) {
        return r.rating == 'unrated';
      }).valueOf());
    }, []).valueOf();
    var beersToRatings = {}, averages = {};
    _.each(ratings, function (r) {
      if (!beersToRatings[r.id]) {
        beersToRatings[r.id] = [];
      }
      beersToRatings[r.id].push(parseFloat(r.rating));
    });
    console.log(beersToRatings);
    var priorMax = 0, maxBeerId;
    _.each(beersToRatings, function (v, k) {
      if (v.length > priorMax) {
        priorMax = v.length;
        maxBeerId = k;
      }
    });
    return beers[maxBeerId];
  }

  //Unrated beers
  //User who drank the most beers
  //Most positive user
  //Most negative user
  function mostPositiveNegativeUser(checkins, users) {
    var ratings = _(checkins).map(function (cVal, userId) {
        return {id: userId, avg: (_.reduce(cVal, function (sum, c) {
          return sum + c;
        }, 0) / cVal.length)};
    }).sortBy('avg').valueOf();
    return {negative: users[_.first(ratings).id], positive: users[_.last(ratings).id]};
  }

  ref.child('checkins').once('value', function (snapshot) {
    var checkins, beers, users;
    checkins = snapshot.val();
    ref.child('beers').once('value', function (snapshot) {
      beers = snapshot.val();
      ref.child('users').once('value', function (snapshot) {
        users = snapshot.val();

        //Continue to do things
        var report = {
          highestRatedBeer: highestLowestRatedBeer(checkins, beers).highest,
          mostFreqentlyRatedBeer: mostFreqentlyRatedBeer(checkins, beers),
          lowestRatedBeer: highestLowestRatedBeer(checkins, beers).lowest,
          //unratedBeers: unratedBeers(checkins, beers),
          //userMostBeersDrank: userMostBeersDrank(checkins, users),
          mostPositiveUser: mostPositiveNegativeUser(checkins, users).positive,
          mostPositiveNegativeUser: mostPositiveNegativeUser(checkins, users).negative
        };

        console.log(report);

        process.exit();
      });
    });
  });

})();
