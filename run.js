const liveServer = require('live-server');
//const prompt = require('prompt');
const wrap = require('prompt-skeleton')

let folderName, fileName;

const prompt = wrap({
    value: 0,
    qty: 1,
    websites: [{
        folderName: "/air-homepage/",
        fileName: 'index.html'
    }, {
        folderName: "/test2/",
        fileName: "test2.html"
    }],
    up: function () {
        this.value < this.qty ? this.value++ : this.value = 0;
        this.render()
    },
    down: function () {
        this.value === this.qty ? this.value-- : this.value = 1;
        this.render()
    },
    render: function () {

        folderName = this.websites[this.value].folderName;
        fileName = this.websites[this.value].fileName;

        this.out.write(`Choose a website to edit: ${this.websites[this.value].folderName}.`)
    }
})

prompt
    .then((val) => {

        // prompt succeeded, do something with the value
        let params = {
                    port: 8181, // Set the server port. Defaults to 8080.
                    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
                    root: "./public" + folderName, // Set root directory that's being served. Defaults to cwd.
                    open: true, // When false, it won't load your browser by default.
                    ignore: 'scss,my/templates', // comma-separated string for paths to ignore
                    file: fileName, // When set, serve this file for every 404 (useful for single-page applications)
                    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
                    mount: [['/components', './node_modules']], // Mount a directory to a route.
                    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
                    middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
                };
            
                liveServer.start(params);

    })
    .catch((val) => {
        // prompt aborted, do something with the value
    })
// prompt.start();

// prompt.get(['folder'], function (err, result) {

//     let params = {
//         port: 8181, // Set the server port. Defaults to 8080.
//         host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
//         root: "./public/" + result.folder + "/", // Set root directory that's being served. Defaults to cwd.
//         open: true, // When false, it won't load your browser by default.
//         ignore: 'scss,my/templates', // comma-separated string for paths to ignore
//         file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
//         wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
//         mount: [['/components', './node_modules']], // Mount a directory to a route.
//         logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
//         middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
//     };

//     liveServer.start(params);

// });
