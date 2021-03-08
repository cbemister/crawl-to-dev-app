// App.js
const crawl = require('./tasks/crawl.js');
const launch = require('./tasks/launch.js');
const wrap = require('prompt-skeleton');
const style = require('ansi-styles');
global.__basedir = __dirname;

const prompt = wrap({
    value: 0,
    options: ['Crawl a new web page', 'Exit', 'Launch an existing web page'],
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
        this.out.write(`What would you like to do: ${style.bgBlue.open} ${this.options[this.value]} ${style.bgBlue.close}`)
    }
}) 

prompt
    .then((val) => {
        // prompt succeeded, do something with the value

        let script = ['crawl','launch','exit'];

        if (val === 0) {
            crawl();

        } else if (val === 2) {
            launch();
        } else {
            return;
        }

    })
    .catch((val) => {
        // prompt aborted, do something with the value
    })

