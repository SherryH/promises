/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */

var Promise = require('bluebird');
var fs = require('fs');

// This function returns a Promise. Returns data in .then() through 'resolve'
// pluckFirstLineFromFile()
// .then((firstLine)=>{})
var pluckFirstLineFromFile = function(filePath) {
  return new Promise((resolve, reject)=>{
    fs.readFile(filePath, (err, data)=>{
      if (err) {
        reject(err);
      } else {
        // return the first line from file
        resolve(data.toString().split('\n')[0]);
      }
    });
  });
};

// This function returns a promise. Doesn't return any data , no 'resolve'
// combineFirstLineOfManyFiles()
// .then(()=>{ console.log('done!')})
// // console.log('done!') is printed when all promiseArr resolved
var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  // TODO
  var promiseArr = filePaths.map((filePath)=>{
    return pluckFirstLineFromFile(filePath);
  });
  return Promise.all(promiseArr)
  .then((firstLines)=>{
    //when all promises in promiseArr are resolved,
    // write each line to the writePath with \n in between
    var msg = firstLines.join('\n');
    fs.writeFile(writePath, msg, (err)=>{
      console.log('file saved');
    });
  });

};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};