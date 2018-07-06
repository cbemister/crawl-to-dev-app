const liveServer = require('live-server');
//const prompt = require('prompt');
const wrap = require('prompt-skeleton')
const dir = require('node-dir');

let folderName, fileName;
 
// dir.subdirs(__dirname + '/public/', function(err, subdirs) {
//     if (err) throw err;
//     console.log(subdirs);
// });

//readFiles( dir, [options], fileCallback, [finishedCallback] )

// dir.readFiles(__dirname + '/public/', {
//     excludeDir: ['node_modules', '.git'],
//     recursive: false,
//     shortName: true
//     }, function(err, content, next) {
//         if (err) throw err;
//         //console.log('content:', content);
//         next();
//     },
//     function(err, files){
//         if (err) throw err;
//         //console.log('finished reading files:',files);
//     });


dir.paths(__dirname + '/public/', function(err, paths) {
    if (err) throw err;
    //console.log('files:\n',paths.files);
    console.log('subdirs:\n', paths.dirs);
    //console.log('subdirs:\n', paths);
}, false);

// dir.paths(__dirname + '/public/', true, function(err, paths) {
//     if (err) throw err;
//     console.log('paths:\n',paths);
// }, false);

const prompt = wrap({
    value: 0,
    qty: 1,
    websites: [{
        folderName: "/test/",
    }, {
        folderName: "/test2/",
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
                    file: 'index.html', // When set, serve this file for every 404 (useful for single-page applications)
                    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
                    mount: [['/components', './node_modules']], // Mount a directory to a route.
                    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
                    middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
                };
            
               // liveServer.start(params);

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
