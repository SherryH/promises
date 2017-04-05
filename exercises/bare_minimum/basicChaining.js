/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var user = require('./promisification.js');
var file = require('./promiseConstructor.js');

var writeFileAsync = Promise.promisify(fs.writeFile);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

  return file.pluckFirstLineFromFileAsync(readFilePath).then(function(line) {
    return user.getGitHubProfileAsync(line);
  }).then(function(profile) {
    return writeFileAsync(writeFilePath, JSON.stringify(profile));
  });



//   return user.getGitHubProfileAsync.then(function(res){


//     file.pluckFirstLineFromFileAsync(readFilePath))
//   .then(writeFileAsync(writeFilePath, res)).
// .catch(function(err) {
//     throw err;
//   });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
