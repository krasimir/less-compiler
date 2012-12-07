var shell = require('shelljs');
var watchr = require('watchr');
var less = require("less");
var fs = require('fs');

exports.init = function(config) {

    if(!config) throw new Error("Please provide configuration.");

    config.lesscPath = config.lesscPath || __dirname + "/node_modules/less/bin/lessc";

    for(var i in config) {
        if(i != "destination" && !fs.existsSync(config[i])) {
            throw new Error("Path doesn't exist (" + config[i] + ")");
        }
    }

    var watch = {
        path: config.pathToWatch,
        listener: function(eventName, filePath, fileCurrentStat, filePreviousStat) {
            shell.exec(config.lesscPath + ' ' + config.fileToCompile + ' > ' + config.destination, function(code, output) {
                if(code === 0) {
                    console.log('less compiled successfully');
                } else {
                    console.log('less compilation failed. ' + output);
                }
            });
        },
        next: function(err, watcher){
            if (err)  throw err;
            console.log('less-compiler watching started ...');
        }
    };

    if(!config.pathToWatch) throw new Error("Missing config parameter 'pathToWatch'.");
    if(!config.lesscPath) throw new Error("Missing config parameter 'lesscPath'.");
    if(!config.fileToCompile) throw new Error("Missing config parameter 'fileToCompile'.");
    if(!config.destination) throw new Error("Missing config parameter 'destination'.");

    watchr.watch(watch);
};


