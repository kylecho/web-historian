var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  fs.readFile('/Users/student/Codes/2015-08-web-historian/web/public/' + asset, function(err, data){
    if (err) {
      exports.serveArchivedSites(res,asset,callback);
    } else{
      res.writeHead(200, headers);
      res.write(data, callback);
    }
  });
};

exports.serveArchivedSites = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  fs.readFile('/Users/student/Codes/2015-08-web-historian/archives/sites/' + asset, function(err, data){
    if (err) {
      res.writeHead(404, headers);
      callback();
    } else{
      res.writeHead(200, headers);
      res.write(data, callback);
    }
  });
};
