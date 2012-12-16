# less-compiler

The main purpose of the module is to compile your .less files automatically. It uses [watchr](https://npmjs.org/package/watchr) to monitor a specific folder for changes and [less](https://npmjs.org/package/less) for compilation. There are some other tools for the same purpose ([less-middleware](https://npmjs.org/package/less-middleware), [less-watch](https://npmjs.org/package/less-watch)) out there, but I needed completelly node based thingy - without the usage of the command line. I.e. something that I could add in my node project without the usage of [express](http://expressjs.com/).

## Requirements
[NodeJS](http://nodejs.org/)

## Installation

    npm install lesscompile

## Usage

    require("lesscompile").init({
        pathToWatch: [path to your less files],
        fileToCompile: [your main less file],
        destination: [.css file as a destination],
        watchForChanges: [true or false, true by default]
    });

example: 

    require("lesscompile").init({
        pathToWatch: __dirname + "/less",
        fileToCompile: __dirname + "/less/main.less",
        destination: __dirname + "/compiled/styles.css",
        watchForChanges: true
    });

or with callback: 

    require("lesscompile").init({
        pathToWatch: __dirname + "/less",
        fileToCompile: __dirname + "/less/main.less",
        destination: __dirname + "/compiled/styles.css"
    }).onCompile(function(css) {
        console.log("the compiled css: ", css);
    });

If you know when the compiler started to watch:

    require("lesscompile").init({
        pathToWatch: __dirname + "/less",
        fileToCompile: __dirname + "/less/main.less",
        destination: __dirname + "/compiled/styles.css"
    }).ready(function() {
        console.log("I'm ready ...");
    });

The usage of absolute paths is recommended.
