'use strict';


const fs = require('fs');
const pathUtil = require('path');
const crypto = require('crypto');
const scanDir = require('./scan-dir');


/**
 * get hash for dir
 *
 * @param {String} dir     - dir
 * @param {Object} options - options
 *  - * options for scan-dir
 *  - salt
 *
 * @return {String}        - hashcode
 */
module.exports = function(dir, options) {
  options = options || {};
  const paths = scanDir(dir, options);
  const shasum = crypto.createHash('sha1');
  options.salt && shasum.update(options.salt);
  for (const path of paths) {
    const rpath = pathUtil.relative(dir, path);
    shasum.update(rpath);

    const buf = fs.readFileSync(path);
    shasum.update(buf);
  }

  return shasum.digest('hex');
};
