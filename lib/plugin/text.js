/**
 *  Text plugin
 */
'use strict';


/*
 * TODO : BOM chars removal
 */

var TextPlugin = function(data) {
  return data.replace(/\t/g,'    ').replace(/\r/g,'');
};

module.exports = TextPlugin;
