/**
 * Keyboard handling
 */

var Emitter = require('events').EventEmitter;

var Events = function(stream) {

  var emitter = new Emitter();

  if (process.stdin.isTTY) {
    stream.setRawMode(true);
  }

  stream.setEncoding('utf8');

  /* istanbul ignore next */
  stream.on('data', (function(key) {
    var name = key;

    switch(key) {
    case '\u001b[D': name = 'left';  break;
    case '\u001b[C': name = 'right'; break;
    case '\u001b[A': name = 'up'; break;
    case '\u001b[B': name = 'down'; break;
    case '\u001b[F': name = 'end'; break;
    case '\u001b[H': name = 'home';  break;

    case '\u001bOA': name = 'up'; break;
    case '\u001bOB': name = 'down'; break;
    case '\u001bOC': name = 'right'; break;
    case '\u001bOD': name = 'left'; break;
    case '\u001bOF': name = 'end'; break;
    case '\u001bOH': name = 'home'; break;

    case '\u001b[8~': name = 'end'; break;
    case '\u001b[7~': name = 'home'; break;

    case '\u001b[1~': name = 'home'; break;
    case '\u001b[4~': name = 'end'; break;

    case '\u001b[5~': name = 'pageup'; break;
    case '\u001b[6~': name = 'pagedown'; break;
    case '\u001b[[5~': name = 'pageup'; break;
    case '\u001b[[6~': name = 'pagedown'; break;

    case '\u0003': this.keyExit(); break;
    case 'q': this.keyExit(); break;
    default:
      break;
    }

    emitter.emit('key', name);

  }).bind(this));


  /* istanbul ignore next */
  this.keyExit = function() {
    emitter.emit('exit', function() {
      process.exit(0);
    });
  };

  return emitter;
};

module.exports = Events;
