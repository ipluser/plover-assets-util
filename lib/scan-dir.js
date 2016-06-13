'use strict';


const fs = require('fs');
const pathUtil = require('path');
const minimatch = require('minimatch');


/**
 * scan dir files with ignore or match rules
 *
 * @param {String} dir - dir for scan
 * @param {Object} options - options
 * {
 *  match: {Array} -  match rules
 *  ignore: {Array} - ignore rules
 * }
 */
module.exports = function(dir, options) {
  options = options || {};

  const list = [];
  scan(dir, list);

  const toRe = pattern => minimatch.makeRe(pattern);
  const matchRules = (options.match || []).map(toRe);
  const ignoreRules = (options.ignore || []).map(toRe);

  return list.filter(path => {
    const rpath = pathUtil.relative(dir, path);
    const test = re => re.test(rpath);
    if (matchRules.some(test)) {
      return true;
    }
    if (ignoreRules.some(test)) {
      return false;
    }
    return true;
  });
};


/**
 * scan dir files
 *
 * @param {String} dir - dir
 * @param {Array}  results  - list for collect path
 */
function scan(dir, results) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (file.startsWith('.')) {
      return;
    }

    const path = pathUtil.join(dir, file);
    const stat = fs.statSync(path);

    /* istanbul ignore else  */
    if (stat.isFile()) {
      results.push(path);
    } else if (stat.isDirectory()) {
      scan(path, results);
    }
  });
}
