require("../index.js").init({
    pathToWatch: __dirname + "/less",
    fileToCompile: __dirname + "/less/main.less",
    destination: __dirname + "/compiled/styles.css",
    watchForChanges: true
}).onCompile(function(css) {
    console.log("the compiled css: ", css);
}).ready(function() {
    console.log("less-compiler is ready");
});