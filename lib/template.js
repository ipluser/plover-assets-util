'use strict';


/**
 * 字符串格式化
 *
 * @param {String} pattern - pattern
 * @param {Object} data    - 上下文
 * @return {String}        - render result
 */
module.exports = function(pattern, data) {
  const reg = /\{([-.\w]+)\}/g;
  return pattern.replace(reg, function(all, name) {
    return data[name] || '';
  });
};
