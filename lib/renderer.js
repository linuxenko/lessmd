/**
 * Rendering module
 *
 */
//'use strict';

var VBuffer = require('./buffer').Buffer;
var Vector = require('./buffer').Vector;
var Events = require('./events');

var ARROW_OFFSET = 5;
var MARGIN = {
  top: 2,
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

/* istanbul ignore next */
var Renderer = function() {
  if (!this.isTTY()) {
    throw new Error('Cannot render into non-terminal device');
  }

  this.setupTerminal = function() {
    if (!this.terminal) {
      this.terminal = new Vector();
    }

    this.terminal.x = process.stdout.columns - (MARGIN.left + MARGIN.right);
    this.terminal.y = process.stdout.rows - MARGIN.top;
  };

  this.setupTerminal();

  this.cursor = new Vector(0, 0);

  this.header = function() { return ''; };
  this.footer = function() { return ''; };


  process.stdout.write('\033[s');

  /**
   * Set vertical ruler (do not rewrite user history)
   */
  if (!process.env.istest) {
    for (var i = 0; i < (this.terminal.y + MARGIN.top - 1); i++) {
      this.rawWrite('\n');
    }
  }

  process.stdout.on('resize', (function() {
    this.setupTerminal();
    this.cursor.x = 0;
    this.cursor.y = 0;

    this.refresh();
    this.display();
  }).bind(this));

  var emitter = new Events(process.stdin);

  emitter.on('exit', (function(cb) {
    process.stdout.write('\033[u');
    cb();
  }).bind(this));

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

    if (name === 'pageup') {
      this.moveCursor(this.cursor.x, this.cursor.y - this.terminal.y);
    }

    if (name === 'pagedown') {
      this.moveCursor(this.cursor.x, this.cursor.y + this.terminal.y);
    }

    if (name === 'home') {
      this.moveCursor(this.cursor.x, 0);
    }

    if (name === 'end') {
      this.moveCursor(this.cursor.x, this.buffer.maxHeight());
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
  var lines = this.terminal.y + MARGIN.top;
  process.stdout.write('\033[' + lines + 'A');
};

/* istanbul ignore next */
Renderer.prototype.rawWrite = function(data) {
  process.stdout.write('\r\033[K' + data);
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
    this.buffer = new VBuffer(this.terminal, this.cursor, data);
  }

  this.refresh();

  var offset = [], i;

  for (i = 0; i < MARGIN.left; i++) {
    offset.push(' ');
  }

  var header = this.header() + '\n';

  this.rawWrite(header);

  this.buffer.render().map((function(l, n) {
    this.rawWrite(offset.concat([l]).join('') + (n < this.buffer.maxHeight() - 1 ? '\n' : ''));
  }).bind(this));

  for (i = 0; i < this.terminal.y - this.buffer.maxHeight() + 1; i++) {
    this.rawWrite('\033[1;36m~\033[0m\n');
  }

  var footer =  this.footer();

  this.rawWrite(footer);
};

module.exports = Renderer;

