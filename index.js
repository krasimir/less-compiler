var shell = require('shelljs');
var watchr = require('watchr');
var less = require("less");
var fs = require('fs');
var callbackOnCompilation = null;
var readyCallback = null;

exports.onCompile = function(callback) {
    callbackOnCompilation = callback;
    return exports;
}

exports.ready = function(callback) {
    readyCallback = callback;
    return exports;
}

exports.init = function(config) {

    if(!config) throw new Error("Please provide configuration.");

    config.lesscPath = config.lesscPath || __dirname + "/node_modules/less/bin/lessc";

    for(var i in config) {
        if(i != "destination" && i != "watchForChanges" && !fs.existsSync(config[i])) {
            throw new Error("Path doesn't exist (" + config[i] + ")");
        }
    }

    if(typeof config.watchForChanges === "undefined") {
        config.watchForChanges = true;
    }

    if(config.watchForChanges) {
        var watch = {
            path: config.pathToWatch,
            listener: function(eventName, filePath, fileCurrentStat, filePreviousStat) {
                exports.compile(config);
            },
            next: function(err, watcher){
                if (err)  throw err;
                console.log('less-compiler watching started ...');
                if(readyCallback) {
                    readyCallback();
                }
            }
        };
        if(!config.pathToWatch) throw new Error("Missing config parameter 'pathToWatch'.");
        if(!config.lesscPath) throw new Error("Missing config parameter 'lesscPath'.");
        if(!config.fileToCompile) throw new Error("Missing config parameter 'fileToCompile'.");
        if(!config.destination) throw new Error("Missing config parameter 'destination'.");
        watchr.watch(watch);
    } else {
        exports.compile(config);
    }
    
    return exports;
};

exports.compile = function(config) {
    var result = shell.exec("node " + config.lesscPath + ' ' + config.fileToCompile, {silent: true});            
    if(result.code === 0) {
        fs.writeFile(config.destination, result.output, function(err) {
            if(err) {
                console.log('compilation succesfull, but the result can not be written to ' + config.destination);
            } else {
                console.log('less compiled successfully');
                if(callbackOnCompilation) {
                    callbackOnCompilation(result.output);
                }
            }
        });
    } else {
        console.log('less compilation failed');
    }
    return exports;
}

