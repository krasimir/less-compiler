require("../index.js").init({
    "pathToWatch": __dirname + "/less",
    "fileToCompile": __dirname + "/less/main.less",
    "destination": __dirname + "/compiled/styles.css"
}).onCompile(function() {
    console.log("callback called");
}).ready(function() {
    console.log("less-compiler is ready");
});