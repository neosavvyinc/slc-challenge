'use strict';

describe('Controller: UsernameCtrl', function () {

  // load the controller's module
  beforeEach(module('slcChallengeApp'));

  var UsernameCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsernameCtrl = $controller('UsernameCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
