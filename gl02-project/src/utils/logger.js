//var environment = require("./environment");
const colors = require("colors");

const logError = (err) => {
    console.log(colors.red(err));
}

const logWarning = (warning) => {
    console.log(colors.yellow(warning));
}

module.exports = {
    logError,
    logWarning
}