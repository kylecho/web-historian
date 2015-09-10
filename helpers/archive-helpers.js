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
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// read a file and return an array of strings
exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths['list'], 'utf8', function(err, data){ // should set a correct encoding to read files.
    var output = (data) ? data.split("\n") : [];
    callback(output);
  });
};

// check an existence for a url in a given list
exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(urls){
    callback(_.contains(urls, url));
  });
};

exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(url, function(is){
    if (!is) {
      fs.appendFile(exports.paths['list'], url + "\n", 'utf8', callback);
    } else {
      callback();
    }
  });
};

// check for dir against the list
exports.isUrlArchived = function(url, callback) {
  fs.readFile(exports.paths['archivedSites'] + "/" + url, 'utf8', function(err, data){
    callback((err===null));
  });
};

// not yet archived dirs
exports.downloadUrls = function(urlArray) {

};
