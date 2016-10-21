/*
 * Bufferized display data handler
 */

'user strict';

/**
 * Create array from incoming string
 *
 * @name stringToArray
 * @function
 * @access public
 * @param {String} string
 * @returns {Array}
 */
var stringToArray = function(string) {
  return string.replace(/\r\n/gi, '\n').split('\n')
    .map(function(l) {
      return l.split('');
    });
};

/**
 * Join the array strings
 *
 * @name arrayToString
 * @function
 * @access public
 * @param {int} start
 * @param {int} end
 * @param {Array} array
 * @returns {String}
 */
var arrayToString = function(start, end, array) {
  return [].slice.call(array,start, start + end).join('');
};

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

  if (data) {
    this.fillBuffer(data);
  }

  return this;
};
/**
 * Fill the data buffer
 *
 * @name fillBuffer
 * @function
 * @access public
 * @param {String} data
 */
Buffer.prototype.fillBuffer = function(data) {
  if (data) {
    this.data = data;
  }

  this.buffer = stringToArray(data);

  return this;
};

/**
 * Render display buffer
 *
 * @name render
 * @function
 * @access public
 * @returns {String}
 */
Buffer.prototype.render = function() {

  var buf = [];

  for (var i = 0; i < this.size.y; i++) {
    if (i < this.buffer.length) {
      buf.push(arrayToString(this.cursor.x, this.size.x, this.buffer[i]));
    }
  }

  return buf.join('\n');
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

