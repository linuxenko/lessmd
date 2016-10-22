#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var Renderer = require('./lib/renderer');
var headerPlugin = require('./lib/plugin/header');
var footerPlugin = require('./lib/plugin/footer');
var textPlugin = require('./lib/plugin/text');


var filename = '-';
var data = '';

var lessmd = (function(isPipe) {
  /* TODO markdown + text plugin for pipes */
  if (isPipe) {
    process.stdout.write(data);
    process.exit(0);
  }

  data = textPlugin(data);

  var render = new Renderer();

  if (filename !== '-') {
    render.header = function() {
      return headerPlugin.call(render,  path.basename(filename));
    };

    render.footer = function() {
      return footerPlugin.call(render, path.basename(filename));
    };
  }

  render.display(data);
}).bind(this);


if (process.argv.length > 2 && fs.existsSync(process.argv[2])) {
  filename = process.argv[2];
  data = fs.readFileSync(filename).toString('utf8');
  lessmd();
} else {
  process.stdin.on('data', function(str) {
    data += str;
  });

  process.stdin.on('end', function() {
    lessmd(true);
  });
}

process.stdin.resume();
process.stdin.setEncoding('utf8');

