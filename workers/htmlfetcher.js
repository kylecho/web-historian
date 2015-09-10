// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var http = require("http-request");
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');

// go through each 'url' in the saved list file, and download if it is new.
archive.readListOfUrls(function(urlArray){

  _.each(urlArray, function(url){
    archive.isUrlArchived(url, function(isArchived){
      if (!isArchived) {
        http.get(
          {
            url: url
          },
          archive.paths.archivedSites + '/' + url,
          function(){}
        );
      }

    });
  });

});

