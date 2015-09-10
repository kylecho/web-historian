var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');

exports.handleRequest = function (req, res) {
  // GET request for local site & archived sites
  if( req.method === 'GET' ){
    // locathost:8080/www.google.com
    asset = (req.url === '/') ? 'index.html' : req.url.substring(1);
    httpHelpers.serveAssets(res, asset, function(){
    res.end();
    });
  } else if ( req.method === 'POST' ) {
    var value = '';
    req.on('data', function(chunk){
      value += chunk;
    });
    req.on('end', function(){
      //Get the url
      url = value.substring(4);
      //Check if page is already archived
      archive.isUrlArchived(url, function(isArchived){
        //Already archived
        if(isArchived){
          //Serve the archived page
          httpHelpers.serveArchivedSites(res, url, function(){
          res.end();})
        }
        //Not archived yet 
        else {
          //Add url to list
          archive.addUrlToList(url, function(){
            //serve the loading page
            httpHelpers.serveAssets(res, "loading.html", function(){
            res.end();});
          });
        }
      }); // end of archive.isUrlArchived
    }); // end of req.on(...)
  } // end of else if (req.method === 'POST')
};