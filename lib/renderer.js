/**
 * Rendering module
 *
 */
'use strict';

var Buffer = require('./buffer').Buffer;
var Vector = require('./buffer').Vector;

/**
 * Renderer is process rendering tool
 *
 * @name Renderer
 * @function
 * @access public
 */
var Renderer = function() {
  if (!this.isTTY()) {
    /* istanbul ignore next */
    throw new Error('Cannot render into non-terminal device');
  }

  this.terminal = new Vector(
    process.stdout.columns,
    process.stdout.rows
  );

  this.cursor = new Vector(0, 0);

  /* istanbul ignore next */
  process.stdout.on('resize', (function() {
    this.terminal.x = this.stdout.columns;
    this.terminal.y = this.stdout.rows;
    this.cursor.x = 0;
    this.cursor.y = 0;

    this.display();
  }).bind(this));

  return this;
};

/**
 * Check is current output device is tty
 *
 * @name isTTY
 * @function
 * @access public
 * @returns {Boolean}
 */
Renderer.prototype.isTTY = function() {
  return process.stdout.isTTY;
};


/**
 * Refresh display
 *
 * @name refresh
 * @function
 * @access public
 */
/* istanbul ignore next */
Renderer.prototype.refresh = function() {
  var blank = '';
  for(var i = 0; i < this.terminal.y; i++) {
    for(var j = 0; j < this.terminal.x; j++) {
      blank += ' ';
    }
    blank += '\n';
  }
  this.rawWrite(blank);
};

/* istanbul ignore next */
Renderer.prototype.rawWrite = function(data) {
  process.stdout.write(data);
  if (this.buffer) {
    for (var i = this.buffer.buffer.length; i < this.terminal.y; i++) {
      process.stdout.write('\n');
    }
  }
};

/**
 * Render to display
 *
 * @name display
 * @function
 * @access public
 * @param {String} data
 */
/* istanbul ignore next */
Renderer.prototype.display = function(data) {
  this.refresh();

  if (data) {
    this.buffer = new Buffer(this.terminal, this.cursor, data);
  }

  this.rawWrite(this.buffer.render());
};

module.exports = Renderer;

