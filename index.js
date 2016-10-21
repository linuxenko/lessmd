var fs = require('fs');
var Vector = require('./buffer').Vector;
var Buffer = require('./buffer').Buffer;


var data = fs.readFileSync('/etc/passwd').toString('utf8');

var termS = new Vector(process.stdout.columns, process.stdout.rows);
var cursor = new Vector(0, 0);

var buf = new Buffer(termS, cursor, data);


console.log(buf.render());



