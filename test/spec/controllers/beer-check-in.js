'use strict';

describe('Controller: BeerCheckInCtrl', function () {

  // load the controller's module
  beforeEach(module('slcChallengeApp'));

  var BeerCheckInCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BeerCheckInCtrl = $controller('BeerCheckInCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
