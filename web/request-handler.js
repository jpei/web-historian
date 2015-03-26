var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

var getSite = function(pathName, response) { // from local storage
  // verify URL path
  // serve http-helpers.serveAssets
  // calls saveSite

  // Wait for POST data to be collected

    // is it in sites.txt?
      // if yes
        // is it archive?
          // if yes
            // display archived page
          // if no
            // display loading page
      // if no
        // append to sites.txt
  if (pathName === '/') {
    pathName = '/index.html';
  }
  if (pathName === '/index.html' || pathName === '/styles.css' || pathName === '/loading.html'){
    httpHelpers.serveAssets(response, archive.paths.siteAssets+pathName, function(){});
  } else {
    //is it in file already
    httpHelpers.serveAssets(response);
  }

};

var saveSite = function(request, response, callback) { // to local storage
  
};

exports.handleRequest = function (req, res) {
  // req.method, req.url
  //We want to check the request url and make sure it is correct.
  var pathName = url.parse(req.url).pathname.toLowerCase();

  if (req.method === "GET") {
    getSite(pathName, res);
  } else if (req.method === "POST") {
    //foo
  }
};
