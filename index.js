var fs = require('fs');
var path = require('path');



var Renderer = require('./lib/renderer');
var headerPlugin = require('./lib/plugin/header');
var footerPlugin = require('./lib/plugin/footer');
var textPlugin = require('./lib/plugin/text');
//var data = fs.readFileSync('/etc/passwd').toString('utf8');
var data = fs.readFileSync('/etc/zlibc.conf').toString('utf8');
var filename = '/etc/zlibc.conf';

data = textPlugin(data);

var render = new Renderer();

render.header = function() {
  return headerPlugin.call(render,  path.basename(filename));
};

render.footer = function() {
  return footerPlugin.call(render, path.basename(filename));
};

render.display(data);

process.stdin.resume();



