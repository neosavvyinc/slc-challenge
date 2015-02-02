'use strict';

describe('Service: updateOnly', function () {

  // load the service's module
  beforeEach(module('slcChallengeApp'));

  // instantiate service
  var updateOnly;
  beforeEach(inject(function (_updateOnly_) {
    updateOnly = _updateOnly_;
  }));

  it('should do something', function () {
    expect(!!updateOnly).toBe(true);
  });

});
