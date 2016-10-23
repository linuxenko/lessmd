/**
 * Header plugin
 *
 */

var Colors = require('./ui-theme');

var Header = function(title) {

  var out = Colors.strong;
  var cursorPos = '';
  out += cursorPos + Colors.end;

  var text = title;
  for (var i = text.length ; i < this.terminal.x + 2 - cursorPos.length; i++) {
    out += ' ';
  }

  out += Colors.text + text + Colors.end;

  return out;
};

module.exports = global.UserSettings.headerfn || Header;
