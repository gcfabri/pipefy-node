'use strict';

require('dotenv').config();

var expect = require('chai').expect;
var pipefy = require('../index')({
  'your_personal_access_token': process.env.PIPEFY_TOKEN
});

/*describe('#sampleFunction', function() {
    it('should do something', function() {
        var result = sampleFunction();
        expect(result).to.equal('1');
    });
});*/