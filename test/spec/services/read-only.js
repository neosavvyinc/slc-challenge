'use strict';

describe('Service: readOnly', function () {

  // load the service's module
  beforeEach(module('slcChallengeApp'));

  // instantiate service
  var readOnly;
  beforeEach(inject(function (_readOnly_) {
    readOnly = _readOnly_;
  }));

  it('should do something', function () {
    expect(!!readOnly).toBe(true);
  });

});
