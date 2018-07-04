var Crawler = require("js-crawler");
var prompt = require('prompt');
var fs = require('fs');
var pretty = require('pretty');


//Trade Dev Env App

let html = '';

// Enter url to import html

//
// Start the prompt
//
prompt.start();

//
// Get two properties from the user: url
//

// http://www.google.com
prompt.get(['url'], function (err, result) {
    //
    // Log the results.
    //
    new Crawler().configure({ depth: 1 })
        .crawl(result.url, function onSuccess(page) {

            // Change the content of the file as you want
            // or either set fileContent to null to create an empty file
            var fileContent = pretty(page.content);

            // The absolute path of the new file with its name
            var filepath = "test.html";

            fs.writeFile(filepath, fileContent, (err) => {
                if (err) throw err;

                console.log("The file was succesfully saved!");
            });

            //html = page.content;
            //console.log(page.content);
        });

});

// - create file from crawl

//console.log(html);

// - either select the code that will be edited or choose an insertion point
// - create workspace file either blank or from selection
// - create live-server to display merged files
// - create test to qc changes on targeted page and other pages




