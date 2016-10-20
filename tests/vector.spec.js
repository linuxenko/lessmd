var Vector = require('../buffer').Vector;
var expect = require('chai').expect;


describe('Testing Vector object', function() {

  it('should exist and can be created', function() {
    expect(Vector).not.to.be.an('undefined');

    var testCoords = new Vector(100,200);

    expect(testCoords).to.be.an('object');
  });

  it('should be possible change values', function() {
    var testCoords = new Vector(20,30);

    expect(testCoords).to.be.an('object');

    expect(testCoords.x).to.be.equal(20);
    expect(testCoords.y).to.be.equal(30);

    testCoords.x = 50;

    expect(testCoords.x).to.be.equal(50);  
  });

});
