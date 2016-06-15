'use strict';


const util = require('..');


describe('template', function() {
  it('test', function() {
    const o = {
      'app.name': 'plory',
      'app.version': '1.0.0'
    };

    util.template('/plover-assets/{app.name}/{app.version}/hash.json', o)
      .should.equal('/plover-assets/plory/1.0.0/hash.json');

    util.template('/c/{empty}', {}).should.equal('/c/');
  });
});

