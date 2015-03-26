var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var url = require('url');
var qs = require('querystring');
// require more modules/folders here!

var getSite = function(pathName, response) { // from local storage
  if (pathName === '') {
    pathName = 'index.html';
  }
  if (pathName === 'index.html' || pathName === 'styles.css' || pathName === 'loading.html'){
    httpHelpers.serveAssets(response, path.join(archive.paths.siteAssets, pathName));
  } else {
    //is it in file already
    checkSitesAndArchive("GET", response, pathName, function() {
      httpHelpers.serveAssets(response, null, 404); // 404
    });
  }
};

var saveSite = function(request, response) { // to sites.txt
  //Is site in archives/sites.txt?
  var data = '';
  request.on('data', function(buffer) {
    data += buffer;
  });
  request.on('end', function() {
    if (data.charAt(0)==='{'){
      var dataObj = JSON.parse(data);
    } else {
      var dataObj = qs.parse(data);
    }
    var url = dataObj.url;
    checkSitesAndArchive("POST", response, url, function(){
      archive.addUrlToList(url, function() {
        // return a response saying your request went through
        httpHelpers.serveAssets(response, url, 302);
      });
    });
  });
};

var checkSitesAndArchive = function(method, response, pathName, callback) {
  archive.isUrlArchived(pathName, function(found) {
    if (found) {
      // if get, serve, if post, redirect
      if (method==='GET') {
        var filePath = path.join(archive.paths.archivedSites, pathName.replace(/\//g,'%2F')); 
        httpHelpers.serveAssets(response, filePath);
      } else {
        httpHelpers.serveAssets(response, pathName, 302);
      }
    } else {
      // is it in sites.txt?
      archive.isUrlInList(pathName, function(found) {
        if (found) {
          // serve loading
          if (method==='GET') {
            httpHelpers.serveAssets(response, path.join(archive.paths.siteAssets, 'loading.html'));
          }
          else {
            httpHelpers.serveAssets(response, pathName, 302);
          }
        } else {
          callback();
        }
      });
    }
  });
}

exports.handleRequest = function (req, res) {
  // req.method, req.url
  //We want to check the request url and make sure it is correct.
  if (req.method === "GET") {
    var pathName = url.parse(req.url).pathname.toLowerCase().substr(1); // Make lower case and remove leading '/'
    getSite(pathName, res);
  } else if (req.method === "POST") {
    saveSite(req, res);
  }
};
