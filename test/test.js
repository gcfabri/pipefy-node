'use strict';

require('dotenv').config();

var TEST_PIPEFY_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjo4MjA4NywiZW1haWwiOiJnY2ZhYnJpQGdtYWlsLmNvbSIsImFwcGxpY2F0aW9uIjozOTgwfX0.HNx2gfPzlzvBYV1C7Apvv_NazzJeuhh0Iq6HUmb_vV9UE52TIArmpnx9pkYeYwRUT1rIKZiNKU4aHA_S9j8Uew'

var expect = require('chai').expect;
var pipefy = require('../index')({
  'your_personal_access_token': TEST_PIPEFY_TOKEN
});

describe('Access Token', function() {
  describe('#TEST_PIPEFY_TOKEN', function() {
    it('should get access token as a string', function() {
      var result = TEST_PIPEFY_TOKEN;
      expect(result).to.be.a('string');
    });
  });
});

describe('Pipefy', function() {
    

    describe('#getMe', function() {
        it('should get personal info from API', function() {
            var result = pipefy.getMe();
            expect(result).to.be;
        });
    });


});