var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  // reads from sites.txt, returns an array
  exports.readFromSites(function(data) {
    var array = (''+data).split('\n');
    if (array[array.length]==='') {
      array.pop();
    }
    callback(array);
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(array){
    var found = false;
    for (var i = 0; i < array.length; i++){
      if (array[i] === url){
        found = true;
        break;
      }
    }
    callback(found);
  });
};

exports.addUrlToList = function(url, done){
  fs.appendFile(exports.paths.list, url+'\n', function(err){
    if (err) throw err;
    done();
  });
};

exports.isUrlArchived = function(url, callback){
  var filePath = path.join(exports.paths.archivedSites, url.replace(/\//g,'%2F')).toLowerCase(); // Replaces '/'s with %2F since '/' is not a legal filename character
  fs.exists(filePath, callback);
};

exports.readFromSites = function(callback){
  fs.readFile(exports.paths.list, function(err, data){
    if (err) throw err;
    callback(data); 
  });
};

exports.downloadUrls = function(urlArray){
  // helps htmlfetcher.js
};