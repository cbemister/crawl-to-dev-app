//Launch.js
const liveServer = require('live-server');
const wrap = require('prompt-skeleton')
const listdirs = require('listdirs');
const style = require('ansi-styles');
const ignored = ['node_modules', '.git', 'css', 'js', 'images', 'fonts'];
const path = require('path');
//const basedir = __dirname + '/public/'; // or which ever base directory you prefer
const basedir = path.join(__dirname); // or which ever base directory you prefer





//path.join(__dirname, '../../../')


const launch = function(folder) {

    let data = {
        folders: [],
        quantity: null,
        selected: '',
        params: {
            port: 8181, // Set the server port. Defaults to 8080.
            host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
            root: "./public/", // Set root directory that's being served. Defaults to cwd.
            open: true, // When false, it won't load your browser by default.
            ignore: 'scss,my/templates', // comma-separated string for paths to ignore
            file: 'index.html', // When set, serve this file for every 404 (useful for single-page applications)
            wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
            mount: [], // Mount a directory to a route.
            logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
            middleware: [function (req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
        }
    };

    function launchWebsite(callback) {

        callback();
    
    }
    
    function checkResponse() {
    
        if (!folder) {
    
            listdirs(basedir + '/public/', function callback(err, list) {
    
                if (err) {
                    console.log(err); // handle errors in your preferred way.
                }
                else {
    
                    //console.log(list); // use the array of directories as required.
    
                    let filteredList = list.filter(path => path.includes('//'));
                    let trimmedPath = filteredList.map(path => path.split('//')['1']);
    
                    data.qty = trimmedPath.length - 1;
                    data.folders = trimmedPath;
    
                    const prompt = wrap({
                        value: 0,
                        qty: data.qty,
                        websites: data.folders,
    
                        up: function () {
    
                            this.value++
                            this.value > this.qty ? this.value = 0 : this.value
                            this.render()
                        },
                        down: function () {
    
                            this.value--
                            this.value === -1 ? this.value = data.qty : this.value
                            this.render()
                        },
                        render: function () {
    
                            data.selected = this.websites[this.value];
                            data.params.root = "./public/" + data.selected;
                            this.out.write(`Select a website to edit by pressing the up or down arrow: ${style.bgBlue.open} ${data.selected} ${style.bgBlue.close}`)
                        }
                    })
    
                    prompt
                        .then((val) => {
    
                            // prompt succeeded, do something with the value
    
                            liveServer.start(data.params);
    
                        })
                        .catch((val) => {
                            // prompt aborted, do something with the value
                        })
    
                }
            }, ignored); // include ignored list as 3rd Parameter (after callback)
    
        } else {

            data.params.root = "./public/" + folder;
    
            const prompt = wrap({
                value: 0,
                options: ['Yes', 'Exit', 'No'],
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
                    this.out.write(`Would you like to launch this website: ${style.bgBlue.open} ${this.options[this.value]} ${style.bgBlue.close}`)
                }
            })
    
            prompt
                .then((val) => {
                    // prompt succeeded, do something with the value
    
                    let script = ['crawl', 'launch', 'exit'];
    
                    if (val === 0) {

                        liveServer.start(data.params);

                    } else {
                        return;
                    }
    
                })
                .catch((val) => {
                    // prompt aborted, do something with the value
                })

        }
    
    }
    
    launchWebsite(checkResponse);

}

module.exports = launch;


// const cpFile = require('cp-file');

// let files =[{ 
//     src: 'src/1.png',
//     dis: 'dist/1.png'
// },{ 
//     src: 'src/2.png',
//     dis: 'dist/2.png'
// },{ 
//     src: 'src/3.png',
//     dis: 'dist/3.png'
// },{ 
//     src: 'src/4.png',
//     dis: 'dist/4.png'
// },{ 
//     src: 'src/2.png',
//     dis: 'dist/2.png'
// }];

// files.map(file => (async (source, destination) => {
//     await cpFile(source, destination);
//     console.log('File copied');
// })(file.src, file.dis));

