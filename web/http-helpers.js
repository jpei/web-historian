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

exports.serveAssets = function(res, asset, statusCode) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  if (statusCode === 404) {
    res.writeHead(statusCode, headers);
    res.end('File not found!');
  } else if (statusCode === 302) {
    exports.sendRedirect(res, asset);
  } else {
    res.writeHead(200, headers);
    fs.readFile(asset, function(err, data) {
      if (err) throw err;
      res.write(data, function() {
        res.end();
      });
    });
  }
};

exports.sendRequest = function() {
  //For htmlfetcher
};

exports.sendRedirect = function(res, path) {
  res.setHeader('Location', '/' + path);
  res.writeHead(302, headers);
  res.end('Redirecting....');
};

// As you progress, keep thinking about what helper functions you can put here!
