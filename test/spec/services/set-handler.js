'use strict';

describe('Service: setHandler', function () {

  // load the service's module
  beforeEach(module('slcChallengeApp'));

  // instantiate service
  var setHandler;
  beforeEach(inject(function (_setHandler_) {
    setHandler = _setHandler_;
  }));

  it('should do something', function () {
    expect(!!setHandler).toBe(true);
  });

});
