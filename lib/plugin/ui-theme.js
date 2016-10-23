/*
 * Theme file
 */

var Colors = {
  text : '\033[1;37;49m',
  strong : '\033[35;49m',

  end : '\033[0m'
};

if (global.UserSettings && global.UserSettings.theme) {
  Object.keys(Colors).forEach(function(key) {
    if (Object(global.UserSettings.theme).hasOwnProperty(key)) {
      Colors[key] = global.UserSettings.theme[key];
    }
  });
}


module.exports = Colors;
