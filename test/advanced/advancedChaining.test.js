var expect = require('chai').expect;
var Promise = require('bluebird');

// NOTE: These tests don't use mocks of any kind
// If test speed or API rate limits become an issue,
// refactor the tests to use mocks, following previous
// `nock` utilizing tests

xdescribe('Advanced chaining', function() {
  var chaining = require('../../exercises/advanced/advancedChaining.js');

  describe('searchCommonTagsFromGitHubProfiles', function() {
    var searchCommonTagsFromGitHubProfiles = chaining.searchCommonTagsFromGitHubProfiles;

    xit('should return a promise', function() {
      // Must return a Bluebird promise. ES6 promise won't work here
      expect(searchCommonTagsFromGitHubProfiles(['danthareja'])).to.be.an.instanceOf(Promise);
    });

    xit('should resolve to an array of tags', function(done) {
      this.timeout(5000);
      searchCommonTagsFromGitHubProfiles(['danthareja'])
        .then(function(tags) {
          expect(tags).to.be.an.instanceOf(Array);
          done();
        })
        .catch(done);
    });

    it('should not have duplicate adjectives in the array of tags', function(done) {
      this.timeout(5000);
      searchCommonTagsFromGitHubProfiles(['danthareja', 'beth'])
        .then(function(tags) {
          console.log('tags', tags);
          var uniques = Object.keys(
            tags.reduce(function(hash, tag) {
              console.log('hash', hash);
              hash[tag] = tag;
              return hash;
            }, {})
          );
          expect(uniques.length).to.equal(tags.length);
          done();
        })
        .catch(done);
    });

    it('should contain the correct tags', function(done) {
      this.timeout(5000);
      searchCommonTagsFromGitHubProfiles(['danthareja', 'sunny-g'])
        .then(function(tags) {
          expect(tags).to.contain('man');
          done();
        })
        .catch(done);
    });

  });

});
