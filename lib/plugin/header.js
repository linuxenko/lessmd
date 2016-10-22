/**
 * Header plugin
 *
 */

var Header = function(title) {

  var out = '\033[7;30;42m';
  var cursorPos = '~ '+title+' >';
  out += cursorPos + '\033[0m\033[32;49m';

  var text = '~ lessmd ';
  for (var i = text.length ; i < this.terminal.x + 2 - cursorPos.length; i++) {
    out += ' ';
  }

  out += '\033[0m\033[0;32m' + text;
  out += '\033[0m';

  return out;

};

module.exports = Header;
