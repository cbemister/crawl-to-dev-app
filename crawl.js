var Crawler = require("js-crawler");
var prompt = require('prompt');
var fs = require('fs');
var pretty = require('pretty');
var scrape = require('website-scraper');

//Trade Dev Env App

// Enter url to import html

//
// Start the prompt
//
prompt.start();

//
// Get two properties from the user: url
//

// http://www.google.com

prompt.get(['url', 'folder'], function (err, result) {
  
    var options = {
        urls: [result.url],
        directory: './public/' + result.folder,
        prettifyUrls: true,
        request: {
            headers: {
              'User-Agent': 'Chrome 40.0 Win7 64-bit'
            }
          }
      };
       
      //https://www.airdriedodge.com/
      //http://www.capitaljeep.com/

      // with promise
      scrape(options).then((result) => {
          /* some code here */



      }).catch((err) => {
          /* some code here */
      });
       
      // or with callback
      scrape(options, (error, result) => {
          /* some code here */
      });
      

});

// - create file from crawl

// - either select the code that will be edited or choose an insertion point
// - create workspace file either blank or from selection
// - create live-server to display merged files
// - create test to qc changes on targeted page and other pages




