// Crawl.js 
const promptSimple = require('prompt');
const wrap = require('prompt-skeleton')
//const fs = require('fs');
//const pretty = require('pretty');
const scrape = require('website-scraper');
//const Storage = require('node-storage');
const Spinner = require('cli-spinner').Spinner;
const launch = require('./launch.js');
 
const crawl = function () {

    promptSimple.start();

    // http://www.google.com

    promptSimple.get(['url', 'folder'], function (err, result) {

        let folder = result.folder;
        
        const spinner = new Spinner('Loading... %s');
        spinner.setSpinnerString(11);
        spinner.start();

        let options = {
            urls: [result.url],
            directory: './public/' + result.folder,
            prettifyUrls: true,
            request: {
                headers: {
                    'User-Agent': 'Chrome 40.0 Win7 64-bit'
                }
            }
        };

        // with promise
        scrape(options).then((result) => {

            /* some code here */

            spinner.stop(true);

            //console.log('promise');


        }).catch((err) => {
            /* some code here */

            //console.log(err);

        });

        // or with callback
        scrape(options, (error, result) => {
            /* some code here */

            //console.log('call back');

            launch(folder);

        });

    });

}

module.exports = crawl;

// - create file from crawl

// - either select the code that will be edited or choose an insertion point
// - create workspace file either blank or from selection
// - create live-server to display merged files
// - create test to qc changes on targeted page and other pages





