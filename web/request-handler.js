var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

var getSite = function(pathName, response) { // from local storage
  // verify URL path
  // serve http-helpers.serveAssets
  // calls saveSite

};

var saveSite = function(request, response, callback) { // to local storage
  // Wait for POST data to be collected

    // is it in sites.txt?
      // if yes
        // is it archive?
          // if yes
            // display archived page
          // if no
            // display loading page
      // if no
        // append to sites.txt IN LOWER CASE
};

exports.handleRequest = function (req, res) {
  // req.method, req.url
  //We want to check the request url and make sure it is correct.
  var pathName = url.parse(req.url).pathname;

  if (req.method === "GET") {
    var path = '/index.html';
    if (pathName === path || pathName === '/'){
      httpHelpers.serveAssets(res, archive.paths.siteAssets+'/index.html', function(){});
    } else {
      //is it in file already
      //getSite(pathName, res);
      httpHelpers.serveAssets(res);
    }
  } else if (req.method === "POST") {
    //foo
  }
  //res.end(archive.paths.list);
};
