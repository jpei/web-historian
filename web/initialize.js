var fs = require('fs');
var path = require('path');

// Sync is ok here because this is called just once on startup.
module.exports = function () {
  // if the archive folder doesn't exist, create it.
  if (!fs.existsSync(path.join(__dirname,"../archives"))) {
    // We use fs.mkdirSync to create the folder
    fs.mkdirSync(path.join(__dirname,"../archives"));
  }

  // if the file doesn't exist, create it.
  if (!fs.existsSync(path.join(__dirname,"../archives/sites.txt"))) {
    // We use fs.openSync to create the file
    var file = fs.openSync(path.join(__dirname,"../archives/sites.txt"), "w");
    fs.closeSync(file);
  }

  // if the folder doesn't exist, create it.
  if (!fs.existsSync(path.join(__dirname,"../archives/sites"))) {
    // We use fs.mkdirSync to create the folder
    fs.mkdirSync(path.join(__dirname,"../archives/sites"));
  }
};
