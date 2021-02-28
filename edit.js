const cheerio = require("cheerio");
const fs = require("fs");
const async = require("async");
const path = require("path");
const basedir = path.join(__dirname); // or which ever base directory you prefer

//console.log(process.env)

  const files = [
    "public/original-2/index.html",
    "public/original-2/_index.html",
  ];

  async.map(files, fs.readFile, function (err, files) {
    if (err) throw err;

    const $ = cheerio.load(files[0]);

    $(".entry").replaceWith('<div class="entry">' + files[1] + "</div>");
    fs.writeFile("public/original-2/index.html", $.html(), function (err) {
      if (err) return console.log(err);
      console.log("HTML Updated");
    });
  });
