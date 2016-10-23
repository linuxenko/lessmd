/*
 *  Footer (statusline) module
 */

var Colors = require('./ui-theme');

var Footer = function() {

  var out = Colors.end + Colors.strong;
  var cursorPos = '  ~line  ' + this.cursor.x + ' ' +this.cursor.y + ' ';
  cursorPos += ' ';
  out += cursorPos + Colors.end + Colors.strong;


  var percentage = Math.floor(((this.cursor.y + this.terminal.y) / this.buffer.maxHeight()) * 100);
  percentage = percentage > 100 ? 100 : percentage;

  percentage = ' ' + percentage + '% ';

  var text = ' ';
  text += ' b ' + this.buffer.maxWidth() + 'x' + this.buffer.maxHeight() + ' ';
  text += ' t '+this.terminal.x + 'x' + this.terminal.y;

  var startPos = this.terminal.x - (cursorPos.length + percentage.length);
  startPos -= text.length;
  startPos /= 2;
  var i = 0;
  for (i = text.length ; i < startPos + text.length ; i++) {
    out += ' ';
  }

  out += Colors.end + Colors.text + percentage + Colors.strong;

  for (var j = i; j < startPos * 2 + text.length ; j++) {
    out += ' ';
  }



  out +=  Colors.end  + Colors.strong + text + Colors.end;

  return out;


};

module.exports = global.UserSettings.footerfn || Footer;
