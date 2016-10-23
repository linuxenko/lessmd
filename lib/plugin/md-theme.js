/*
 *  Markdown theme
 */


var ch = require('color-header');

var Colors = {
  text : '', //ch.COLOR_WHITE_NORMAL_COLOREND,
  lang : ch.COLOR_BOLD_YELLOW_NORMAL,
  heading : ch.COLOR_BOLD_WHITE_NORMAL_COLOREND,
  code : ch.COLOR_YELLOW_NORMAL,
  quote : ch.COLOR_MAGENTA_NORMAL,
  em : ch.COLOR_WHITE_NORMAL,
  codespan : ch.COLOR_CYAN_BLACK,
  strong : ch.COLOR_WHITE_NORMAL,
  html : ch.COLOR_MAGENTA_NORMAL,
  del : ch.COLOR_UNDERSCORE_WHITE_NORMAL,
  link : ch.COLOR_CYAN_NORMAL,
  hr : '',
  listitem : ch.COLOR_WHITE_NORMAL,
  end : '\033[0m'
};

if (global.UserSettings && global.UserSettings.colors) {
  Object.keys(Colors).forEach(function(key) {
    if (Object(global.UserSettings.colors).hasOwnProperty(key)) {
      Colors[key] = global.UserSettings.colors[key];
    }
  });
}


module.exports = Colors;
