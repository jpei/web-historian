// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

//We need to deal with archive-helpers
//We need downloadUrls
//We need to call readListOfUrls to get our array
//Callback HELL

archive.readListOfUrls(archive.downloadUrls);