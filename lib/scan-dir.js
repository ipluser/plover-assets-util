'use strict';


const fs = require('fs');
const pathUtil = require('path');
const minimatch = require('minimatch');


module.exports = scan;


const globalIgnoreRules = [
  '.*',
  'node_modules',
  'README',
  'README.md',
  'package.json'
];


function scan(root) {
  const list = [];
  const files = fs.readdirSync(root);
  files.forEach(file => {
    const ignore = globalIgnoreRules.some(rule => minimatch(file, rule));
    if (ignore) {
      return;
    }

    const path = pathUtil.join(root, file);
    const stat = fs.statSync(path);

    /* istanbul ignore else  */
    if (stat.isFile()) {
      list.push(path);
    } else if (stat.isDirectory()) {
      list.push.apply(list, scan(path));
    }
  });
  return list;
}
