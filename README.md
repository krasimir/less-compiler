# less-compiler

The main purpose of the module is to compile your .less files automatically. It uses [watchr](https://npmjs.org/package/watchr) to monitor a specific folder for changes and [less](https://npmjs.org/package/less) for compilation. There are some other tools for the same purpose ([less-middleware](https://npmjs.org/package/less-middleware), [less-watch](https://npmjs.org/package/less-watch)) out there, but I needed completelly node based thingy - without the usage of the command line. I.e. something that I could add in my node project.

## Requirements
[NodeJS](http://nodejs.org/)

## Installation

    npm install lesscompile

## Usage

    require("less-compiler").init({
        "pathToWatch": [path to your less files],
        "fileToCompile": [your main less file],
        "destination": [.css file as a destination]
    });

example: 

    require("lesscompile").init({
        "pathToWatch": __dirname + "/less",
        "fileToCompile": __dirname + "/less/main.less",
        "destination": __dirname + "/compiled/styles.css"
    });

The usage of absolute paths is recommended.
