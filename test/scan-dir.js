'use strict';


const pathUtil = require('path');
const scanDir = require('..').scanDir;


describe('scanDir', function() {
  it('test', function() {
    const dir = pathUtil.join(__dirname, 'fixtures/scan-dir');
    const list = scanDir(dir).map(path => pathUtil.relative(dir, path));
    list.should.eql([
      'a.txt',
      'assets/css/test.less',
      'assets/js/view.js',
      'b.txt'
    ]);
  });
});
