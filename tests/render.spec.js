
var expect = require('chai').expect;
var Renderer = require('../lib/renderer');

describe('Testing Renderer object', function() {

  it('should be exist', function() {
    expect(Renderer).to.exist;
//    expect(function() {
//      process.env.istest = true;
//      var render = new Renderer(true);
//
//      expect(render).to.be.an('object');
//      expect(render.isTTY()).to.be.oneOf([true, false]);
//      expect(render).to.have.property('terminal');
//      expect(render.terminal).to.be.an('object');
//    }).not.to.throw();
  });
});
