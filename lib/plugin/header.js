/**
 * Header plugin
 *
 */

var Header = function(title) {

  var out = '\033[32;49m';
  for (var i = 0 ; i <= this.terminal.x - title.length; i++) {
    out += ' ';
  }

  out += title;
  out += '\033[0m';

  return out;
};

module.exports = Header;
