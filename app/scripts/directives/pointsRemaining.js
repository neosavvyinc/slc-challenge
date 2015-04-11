angular.module('slcChallengeApp').directive('pointsRemaining', function () {
  return {
    template: '<div><h2 class="bg-success text-center text-uppercase">You have used {{usedVotes}} votes out of 3</h2></div>',
    scope: {
      usedVotes: '@'
    }
  };
});
