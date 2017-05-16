'use strict';

require('dotenv').config();

var expect = require('chai').expect;
var pipefy = require('../index')({
  'your_personal_access_token': process.env.PIPEFY_TOKEN
});

/*describe('#pipefy', function() {
    it('should get personal information from API', function() {
        var result = pipefy.getMe();
        expect(result).to.equal('1');
    });
});*/