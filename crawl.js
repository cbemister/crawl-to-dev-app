// Crawl.js
const promptSimple = require("prompt");
const wrap = require("prompt-skeleton");
const fs = require("fs");
//const pretty = require('pretty');
const scrape = require("website-scraper");
//const Storage = require('node-storage');
const Spinner = require("cli-spinner").Spinner;
const launch = require("./launch.js");

//Load the library and specify options
const replace = require("replace-in-file");

const crawl = function () {
  promptSimple.start();

  // http://www.google.com

  promptSimple.get(["url", "folder"], function (err, result) {
    let folder = result.folder;

    const spinner = new Spinner("Loading... %s");
    spinner.setSpinnerString(11);
    spinner.start();

    let options = {
      urls: [result.url],
      directory: "./public/" + result.folder,
      prettifyUrls: true,
      request: {
        headers: {
          "User-Agent": "Chrome 40.0 Win7 64-bit",
        },
      },
    };

    // with promise
    scrape(options)
      .then((result) => {
        /* some code here */

        spinner.stop(true);

        //console.log('promise');
      })
      .catch((err) => {
        /* some code here */
        //console.log(err);
      });

    // or with callback
    scrape(options, (error, result) => {
      /* some code here */

      //console.log('call back');

      // const options = {
      //     files: './public/' + folder + '/index.html',
      //     from: /<head>/g,
      //     to: '<link href="./cssChanges.css" rel="stylesheet" type="text/css"><head>',
      //   };

      const options = {
        files: "./public/" + folder + "/index.html",
        from: [/<\/head>/g, /<\/body>/g],
        to: [
          '<link href="./assets/dist/_styles.css" rel="stylesheet" type="text/css"><link href="./assets/src/tailwind.css" rel="stylesheet type="text/css""></head>',
          '<script src="./_scripts.js"></script></body>',
        ],
      };

      replace(options)
        .then((changes) => {
          //console.log('Modified files:', changes.join(', '));

          fs.open(
            "./public/" + folder + "/_scripts.js",
            "w",
            function (err, file) {
              if (err) throw err;
            }
          );

          fs.open(
            "./public/" + folder + "/_styles.scss",
            "w",
            function (err, file) {
              if (err) throw err;
            }
          );

          fs.open(
            "./public/" + folder + "/_index.html",
            "w",
            function (err, file) {
              if (err) throw err;
            }
          );

          launch(folder);
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });
    });
  });
};

module.exports = crawl;

// - create file from crawl

// - either select the code that will be edited or choose an insertion point
// - create workspace file either blank or from selection
// - create live-server to display merged files
// - create test to qc changes on targeted page and other pages
