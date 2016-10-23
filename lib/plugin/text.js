/**
 *  Text plugin
 */

var TextPlugin = function(data) {
  return data
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');
};

module.exports = TextPlugin;
