angular.module('slcChallengeApp').directive('pointsRemaining', function () {
  return {
    template: '<div><h2 class="bg-success text-center text-uppercase" ng-if="pointsGiven">You gave {{beerName}} {{pointsGiven}} votes.</h2></div>',
    scope: {
      beerName: '@',
      pointsGiven: '@'
    }
  };
});
