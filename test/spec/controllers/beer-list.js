'use strict';

describe('Controller: BeerListCtrl', function () {

  // load the controller's module
  beforeEach(module('slcChallengeApp'));

  var BeerListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BeerListCtrl = $controller('BeerListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
