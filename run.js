const liveServer = require('live-server');
const wrap = require('prompt-skeleton')
const listdirs = require('listdirs');
const style = require('ansi-styles');
 
const ignored  = ['node_modules', '.git', 'css', 'js', 'images', 'fonts'];
const basedir  = __dirname + '/public/'; // or which ever base directory you prefer

let data = {
    folders: [],
    quantity: null,
    selected: ''
};

listdirs(basedir, function callback(err, list){
    if(err){
      console.log(err); // handle errors in your preferred way.
    }
    else {

      //console.log(list); // use the array of directories as required.

      let filteredList = list.filter(path => path.includes('//'));

      let trimmedPath =  filteredList.map(path => path.split('//')['1']);

        data.qty = trimmedPath.length -1;

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

                data.selected = this.websites[this.value]

                this.out.write(`

        Select a website to edit by pressing the up or down arrow: ${style.bgBlue.open} ${data.selected} ${style.bgBlue.close} 
                    
                    `)


            }
        })

        prompt
    .then((val) => {

        // prompt succeeded, do something with the value
        let params = {
                    port: 8181, // Set the server port. Defaults to 8080.
                    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
                    root: "./public/" + data.selected, // Set root directory that's being served. Defaults to cwd.
                    open: true, // When false, it won't load your browser by default.
                    ignore: 'scss,my/templates', // comma-separated string for paths to ignore
                    file: 'index.html', // When set, serve this file for every 404 (useful for single-page applications)
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

    }
}, ignored); // include ignored list as 3rd Parameter (after callback)
