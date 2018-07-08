// Crawl.js 
const prompt = require('prompt');
const wrap = require('prompt-skeleton')
//const fs = require('fs');
//const pretty = require('pretty');
const scrape = require('website-scraper');
//const Storage = require('node-storage');
const Spinner = require('cli-spinner').Spinner;
const launch = require('./launch.js');
 
const crawl = function () {

    prompt.start();

    // http://www.google.com

    prompt.get(['url', 'folder'], function (err, result) {
        
        const spinner = new Spinner('Loading... %s');
        spinner.setSpinnerString(11);
        spinner.start();

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

        // with promise
        scrape(options).then((result) => {

            /* some code here */

            spinner.stop(true);

            //console.log('promise')


        }).catch((err) => {
            /* some code here */
        });

        // or with callback
        scrape(options, (error, result) => {
            /* some code here */


            const prompt = wrap({
                value: 0,
                options: ['Yes', 'No', 'Exit'],
                up: function () {
                    this.value++
                    this.value > 2 ? this.value = 0 : this.value
                    this.render()
                },
                down: function () {
                    this.value--
                    this.value === -1 ? this.value = 2 : this.value
                    this.render()
                },
                render: function () {
                    this.out.write(`Would you like launch this website: ${style.bgBlue.open} ${this.options[this.value]} ${style.bgBlue.close}`)
                }
            }) 
            
            prompt
                .then((val) => {
                    // prompt succeeded, do something with the value
            
                    let script = ['crawl','launch','exit'];
            
                    if (val === 0) {
                        launch();
                    } else {
                        return;
                    }
            
                })
                .catch((val) => {
                    // prompt aborted, do something with the value
                })

        });


    });

}

module.exports = crawl;

// - create file from crawl

// - either select the code that will be edited or choose an insertion point
// - create workspace file either blank or from selection
// - create live-server to display merged files
// - create test to qc changes on targeted page and other pages





