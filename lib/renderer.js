/**
 * Rendering module
 *
 */
'use strict';

var Buffer = require('./buffer').Buffer;
var Vector = require('./buffer').Vector;
var Events = require('./events');

var ARROW_OFFSET = 5;
var MARGIN = {
  left: 1,
  right : 1
};
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

  this.setupTerminal = function() {
    if (!this.terminal) {
      this.terminal = new Vector();
    }

    this.terminal.x = process.stdout.columns - (MARGIN.left + MARGIN.right);
    this.terminal.y = process.stdout.rows - 2;
  };

  this.setupTerminal();

  this.cursor = new Vector(0, 0);

  this.header = '\n\n';

  /* istanbul ignore next */
  process.stdout.on('resize', (function() {
    this.setupTerminal();
    this.cursor.x = 0;
    this.cursor.y = 0;

    this.refresh();
    this.display();
  }).bind(this));

  var emitter = new Events(process.stdin);

  /* istanbul ignore next */
  emitter.on('key', (function(name) {
    if (name === 'left') {
      this.moveCursor(this.cursor.x - ARROW_OFFSET, this.cursor.y);
    }

    if (name === 'right') {
      this.moveCursor(this.cursor.x + ARROW_OFFSET, this.cursor.y);
    }

    if (name === 'up') {
      this.moveCursor(this.cursor.x, this.cursor.y - ARROW_OFFSET);
    }

    if (name === 'down') {
      this.moveCursor(this.cursor.x, this.cursor.y + ARROW_OFFSET);
    }
  }).bind(this));

  return this;
};


/**
 * Move current screen to position
 *
 * @name moveCursor
 * @function
 * @access public
 * @param {int} x
 * @param {int} y
 */
/* istanbul ignore next */
Renderer.prototype.moveCursor = function(x,y) {
  if (!this.buffer) {
    return;
  }

  if (this.terminal.x < this.buffer.maxWidth()) {

    var maxX = Math.abs(this.terminal.x - this.buffer.maxWidth());

    if (x < 0) { x = 0; }
    if (x > maxX) { x = maxX; }

  } else {
    x = this.cursor.x;
  }


  if (this.terminal.y < this.buffer.maxHeight()) {
    var maxY = Math.abs(this.terminal.y - this.buffer.maxHeight());

    if (y < 0) { y = 0; }
    if (y > maxY) { y = maxY; }
  } else {
    y = this.cursor.y;
  }



  //if (x < 0) { return; }
  //if (x > this.buffer.buffer.length) { return; }


  if (x !== this.cursor.x || y !== this.cursor.y) {
    this.cursor.x = x;
    this.cursor.y = y;
    this.display();
  }
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
  if (data) {
    this.buffer = new Buffer(this.terminal, this.cursor, data);
  }

  var offset = [], i;

  for (i = 0; i < MARGIN.left; i++) {
    offset.push(' ');
  }

  var header = '\n'+this.header()+'\n';
  var footer = '\n---hello world';

  var content = this.buffer.render().map(function(l) {
    return offset.concat([l]).join('');
  }).join('\n');

  this.rawWrite(header);
  this.rawWrite(content);

  if (this.buffer) {
    for (i = this.buffer.maxHeight(); i < this.terminal.y; i++) {
      this.rawWrite('\n');
    }
  }

  this.rawWrite(footer);
};

module.exports = Renderer;

