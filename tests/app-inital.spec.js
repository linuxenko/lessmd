var expect = require('chai').expect;

describe('Small test of the current setup', function() {

  it('should pass simple tests', function() {
    expect(true).to.be.true;
    expect({}).to.be.an('object');
    expect('test').to.be.a('string');
  });

});
