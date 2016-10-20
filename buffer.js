/*
 * Bufferized display data handler
 */

'user strict';

/**
 * Display buffer object
 *
 * @name Buffer
 * @function
 * @access public
 * @param {Vector} size terminal dimensions
 * @param {Vector} cursor cursor position
 * @param {String} data the data to be displayed
 * @returns {Buffer}
 */
var Buffer = function(size, cursor, data) {
  this.size = size;
  this.cursor = cursor;
  this.data = data;

  return this;
};


/**
 * Vecor two dimensional coordinates object
 *
 * @name Vector
 * @function
 * @access public
 * @param {int} x
 * @param {int} y
 * @returns {Vector}
 */
var Vector = function(x, y) {
  this.x = x;
  this.y = y;

  return this;
};


module.exports = { Vector : Vector, Buffer : Buffer };
