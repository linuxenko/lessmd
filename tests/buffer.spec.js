var Buffer = require('../lib/buffer').Buffer;
var Vector = require('../lib/buffer').Vector;
var expect = require('chai').expect;


describe('Testing Buffer object', function() {
  it ('should be exist', function() {
    expect(Buffer).not.to.be.an('undefined');
  });

  it('should be created without errors', function() {
    var term = new Vector(20,30);
    var cursor = new Vector(0,0);
    var data = 'hello\nworld';

    expect(term).to.be.an('object');
    expect(cursor).to.be.an('object');
    expect(data).to.be.a('string');

    var buffer = new Buffer(term, cursor, data);

    expect(buffer).to.be.an('object');
  });
});
