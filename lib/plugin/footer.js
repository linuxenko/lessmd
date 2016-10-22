/*
 *  Footer (statusline) module
 */


var Footer = function() {

  var out = '\033[7;30;42m';
  var cursorPos = '  ~line  ' + this.cursor.x + ' ' +this.cursor.y + ' ';
  cursorPos += ' >';
  out += cursorPos + '\033[0m\033[32;49m';


  var percentage = Math.floor(((this.cursor.y + this.terminal.y) / this.buffer.maxHeight()) * 100);
  percentage = percentage > 100 ? 100 : percentage;

  percentage = ' ' + percentage + '% ';

  var text = '< ';
  text += ' b ' + this.buffer.maxWidth() + 'x' + this.buffer.maxHeight() + ' ';
  text += ' t '+this.terminal.x + 'x' + this.terminal.y;

  var startPos = this.terminal.x - (cursorPos.length + percentage.length);
  startPos -= text.length;
  startPos /= 2;
  var i = 0;
  for (i = text.length ; i < startPos + text.length ; i++) {
    out += ' ';
  }

  out += '' + percentage + '\033[32;49m';

  for (var j = i; j < startPos * 2 + text.length ; j++) {
    out += ' ';
  }



  out += '\033[0m\033[7;30;42m' + text;
  out += '~\033[0m';

  return out;


};

module.exports = Footer;
