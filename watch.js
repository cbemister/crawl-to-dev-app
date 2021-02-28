const cheerio = require("cheerio");
const fs = require("fs");
const async = require("async");
const path = require("path");

const folder = process.argv[2];
const basedir = path.join(__dirname + "/public/" + folder + "/"); // or which ever base directory you prefer

//console.log(process.env)

const files = [basedir + "index.html", basedir + "_index.html"];

const watch = () => async.map(files, fs.readFile, function (err, files) {
    if (err) throw err;

    const $ = cheerio.load(files[0]);

    $(".entry").replaceWith('<div class="entry">' + files[1] + "</div>");
    fs.writeFile(basedir + "index.html", $.html(), function (err) {
      if (err) return console.log(err);
      console.log("HTML Updated");
    });
  });

  module.exports = watch;