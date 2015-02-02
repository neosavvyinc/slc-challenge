'use strict';

describe('Service: globalErrorHandler', function () {

  // load the service's module
  beforeEach(module('slcChallengeApp'));

  // instantiate service
  var globalErrorHandler;
  beforeEach(inject(function (_globalErrorHandler_) {
    globalErrorHandler = _globalErrorHandler_;
  }));

  it('should do something', function () {
    expect(!!globalErrorHandler).toBe(true);
  });

});
