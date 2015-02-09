'use strict';

describe('Filter: momentFormat', function () {

  // load the filter's module
  beforeEach(module('slcChallengeApp'));

  // initialize a new instance of the filter before each test
  var momentFormat;
  beforeEach(inject(function ($filter) {
    momentFormat = $filter('momentFormat');
  }));

  it('should return the input prefixed with "momentFormat filter:"', function () {
    var text = 'angularjs';
    expect(momentFormat(text)).toBe('momentFormat filter: ' + text);
  });

});
