const cheerio = require("cheerio");
const fs = require("fs");
const async = require("async");
const path = require("path");
const concat = require("concat");

const folder = process.argv[2];
const basedir = path.join(__dirname + "/../public/" + folder + "/"); // or which ever base directory you prefer

const files = [
  basedir + "assets/dist/_tailwind.css",
  basedir + "assets/dist/_styles.css",
  basedir + "_index.html",
  basedir + "_scripts.js",
];

async.map(files, fs.readFile, function (err, files) {
  if (err) throw err;

  concat([
    basedir + "assets/dist/_tailwind.css",
    basedir + "assets/dist/_styles.css",
  ]).then((combinedCSS) => {

    const $ = cheerio.load(files[2]);

    $('body').prepend('<style>' + combinedCSS + '</style>')
    $('body').append('<script>' + files[3] + '</script>')

    fs.writeFile(basedir + "assets/dist/_index.html", $.html(), function (err) {
      if (err) return console.log(err);
      console.log("HTML Updated");
    });
  });
});
