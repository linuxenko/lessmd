var fs = require('fs');


var Renderer = require('./lib/renderer');
var Events = require('./lib/events');

var data = fs.readFileSync('/etc/passwd').toString('utf8');


var render = new Renderer();
new Events(process.stdin);

render.display(data);

process.stdin.resume();
//console.log(buf.render());



