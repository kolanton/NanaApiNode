const assert = require('assert');
const Talkback = require('../models/talkback');


  describe('#find()', function () {
    it('length must be', function () {
      let tb = new Talkback();
      let talkback = tb.talkback
        .find({}, (err, post) => {
        assert.notEqual(post.length,'undefined');
        });    
    });
  });
