/**
 * Your task is to write a function that uses a deep learning
 * algorithm to determine the common set of tags between
 * multiple github profile pictures
 *
 * Given an array of github handles, searchCommonTagsFromGitHubProfiles should:
 *   1) get the public profile associated with each handle
 *   2) extract the avatar_url of each profile
 *   4) get the set of tags for each avatar_url (requires authentication)
 *   5) find the intersection of the tags
 *
 * Much of the heavy lifting has been done already in `lib/advancedChainingHelpers`,
 * you just have to wire everything up together! Once you pass this one, you'll
 * be a promise chaining master! Have fun!
 */

var Promise = require('bluebird');
var lib = require('../../lib/advancedChainingLib.js');

// We're using Clarifai's API to recognize different an image into a list of tags
// Visit the following url to sign up for a free account
//     https://developer.clarifai.com/accounts/login/?next=/applications/
// Then, create a new Application and pass your Client Id and Client Secret into the method below
var YOUR_CLIENT_ID = 'aCVeTqbxMspmBQpn7Qf7DNgxwONyG41K5QUBbz-6';
var YOUR_CLIENT_SECRET = 'bRswy1c6ZNKB4lo2S40ntbkKu-XUuTlzF0Th6YkB';
lib.setImageTaggerCredentials(YOUR_CLIENT_ID, YOUR_CLIENT_SECRET);

var searchCommonTagsFromGitHubProfiles = function(githubHandles) {
  // return new Promise(function(resolve, reject){
  // });
  var arr = githubHandles.map(function(handle) {
    return lib.getGitHubProfile(handle)
    .then(function(profile) {
      return profile.avatarUrl;
    });
  });

  var authToken = null;

  return lib.authenticateImageTagger() //get the token
  .then(function(token) {
    console.log('token', token);
    authToken = token;
    return Promise.all(githubHandles.map(lib.getGitHubProfile));
  })
  .map(function(profile) {
    //now need to get a set of tags for each url using tagImage() //need profile and token
    console.log('profile', profile);
    return lib.tagImage(profile.avatarUrl, authToken);
  })
  .then(function(tags) {
    console.log('tagImage', tags);
    return Promise.all(arr);
  });


};

// Export these functions so we can unit test them
module.exports = {
  searchCommonTagsFromGitHubProfiles: searchCommonTagsFromGitHubProfiles
};
