'use strict';


const fs = require('fs');
const pathUtil = require('path');
const hashDir = require('..').hashDir;


describe('hashDir', function() {
  const dir = pathUtil.join(__dirname, 'fixtures/app');

  it('test', function() {
    const hashA = hashDir(dir);
    const hashB = hashDir(dir);
    hashA.should.equal(hashB);

    const other = pathUtil.join(dir, 'other.txt');
    fs.writeFileSync(other, 'some test');
    const hashC = hashDir(dir);
    hashC.should.not.equal(hashA);

    fs.unlinkSync(other);
    const hashD = hashDir(dir);
    hashA.should.equal(hashD);
  });
});
