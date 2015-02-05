'use strict';

describe('Controller: LeaderDataCtrl', function () {

  // load the controller's module
  beforeEach(module('slcChallengeApp'));

  var LeaderDataCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LeaderDataCtrl = $controller('LeaderDataCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
