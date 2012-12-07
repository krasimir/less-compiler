require("../index.js").init({
    "pathToWatch": __dirname + "/less",
    "fileToCompile": __dirname + "/less/main.less",
    "destination": __dirname + "/compiled/styles.css"
});