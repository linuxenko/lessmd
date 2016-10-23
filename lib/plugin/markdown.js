/*
 *  Markdown plugin
 */

var marked = require('marked');
var Colors = require('./md-theme.js');

var colorize = function(type, body) {
  return Colors[type] + body + Colors['end'];
};

var Renderer = function(options) {
  this.options = options || {};
};

Renderer.prototype.code = function(code, lang) {
  lang = lang || 'code';
  return colorize('lang', lang + ':\n\n') + colorize('code', code) + '\n\n';
};

Renderer.prototype.blockquote = function(quote) {
  return colorize('quote', quote);
};

Renderer.prototype.html = function(html) {
  return colorize('html', html) + '\n';
};

Renderer.prototype.heading = function(text) {
  return colorize('heading', text) + '\n\n';
};

Renderer.prototype.hr = function() {
  return  colorize('hr', '\n');
};

Renderer.prototype.list = function(body) {
  return body + '\n';
};

Renderer.prototype.listitem = function(text) {
  return ' * ' + colorize('listitem', text) + '\n';
};

Renderer.prototype.paragraph = function(text) {
  return text + '\n\n';
};

Renderer.prototype.table = function(header) {
  return header;
};

Renderer.prototype.tablerow = function(content) {
  return  content;
};

Renderer.prototype.tablecell = function(content) {
  return  content;
};

Renderer.prototype.strong = function(text) {
  return colorize('strong', text);
};

Renderer.prototype.em = function(text) {
  return colorize('em', text);
};

Renderer.prototype.codespan = function(text) {
  return colorize('codespan', text);
};

Renderer.prototype.br = function() {
  return '\n';
};

Renderer.prototype.del = function(text) {
  return colorize('del', text);
};

Renderer.prototype.link = function(href, title, text) {
  return colorize('strong', '\r\n['+text+'] ') + colorize('link', href);
};

Renderer.prototype.image = function(href, title, text) {
  return text;
};

Renderer.prototype.text = function(text) {
  return colorize('text', text);
};


var Markdown = function(data) {
  marked.setOptions({
    renderer: new Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: false,
    smartypants: false
  });

  return marked(data);
};

var toBuffer = function(string) {
  var out = string.split('\n').map(function(l) {
    var row = [], node = '';
    /*
     * TODO Save special characters for each symbol (<> nav)
     */
    for (var i = 0; i < l.length; i++) {
      if (l.charAt(i) === '\u001b') {
        for (;l.charAt(i);i++) {
          node += l.charAt(i);
          if (l.charAt(i) === 'm') {
            break;
          }
        }
      } else {
        node = l.charAt(i);
      }
      row.push(node);
      node = '';
    }
    return row;
  });

  return out;

};

var isMarkdown = function(s) {
  var qs = s.match(/```/g) || [];
  var hd = s.match(/###/g) || [];
  var sq = s.match(/`.{3,}`/g) || [];
  var ln = s.match(/\[\!\[/g) || [];
  var ls = s.match(/\*/g) || [];

  if (sq.length + qs.length > 1 || hd.length >= 1 || ln.length >= 1 || ls.length > 1) {
    return true;
  }

  return false;
};

module.exports = {
  Markdown : Markdown,
  isMarkdown : isMarkdown,
  toBuffer : toBuffer
};

