'use strict';

describe('Service: haveUsername', function () {

  // load the service's module
  beforeEach(module('slcChallengeApp'));

  // instantiate service
  var haveUsername;
  beforeEach(inject(function (_haveUsername_) {
    haveUsername = _haveUsername_;
  }));

  it('should do something', function () {
    expect(!!haveUsername).toBe(true);
  });

});
