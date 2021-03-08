const fs = require("fs");
const path = require("path");
const minify = require('minify');

const folder = process.argv[2];
const basedir = path.join(__dirname + "/public/" + folder + "/"); // or which ever base directory you prefer

minify(basedir + 'assets/dist/_index.html')
    .then((html) => {
      fs.writeFile(basedir + "assets/dist/_index.html", html, function (err) {
        if (err) return console.log(err);
        console.log("HTML Minified");
      });
}).catch(console.error);

