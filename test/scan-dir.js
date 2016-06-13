'use strict';


const pathUtil = require('path');
const scanDir = require('..').scanDir;


describe('scanDir', function() {
  const dir = pathUtil.join(__dirname, 'fixtures/app');

  const toRelative = path => pathUtil.relative(dir, path);

  it('scan dir files', function() {
    const list = scanDir(dir).map(toRelative);
    list.should.eql([
      'README.md',
      'a.txt',
      'assets/css/test.less',
      'assets/js/view.js',
      'b.txt',
      'package.json'
    ]);
  });


  it('scan dir with ignore rules', function() {
    const options = {
      ignore: ['package.json', 'README.md', 'README']
    };
    const list = scanDir(dir, options).map(toRelative);
    list.should.eql([
      'a.txt',
      'assets/css/test.less',
      'assets/js/view.js',
      'b.txt'
    ]);
  });


  it('scan dir with match rules', function() {
    const options = {
      match: ['a.txt'],
      ignore: ['*.txt', 'README.md', 'package.json']
    };

    const list = scanDir(dir, options).map(toRelative);
    list.should.eql([
      'a.txt',
      'assets/css/test.less',
      'assets/js/view.js'
    ]);
  });


  it('options.relative', function() {
    const options = {
      ignore: ['app/package.json'],
      relative: pathUtil.dirname(dir)
    };

    const list = scanDir(dir, options).map(toRelative);
    list.should.eql([
      'README.md',
      'a.txt',
      'assets/css/test.less',
      'assets/js/view.js',
      'b.txt'
    ]);
  });
});
