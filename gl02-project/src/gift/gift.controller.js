const parse = require("gift-pegjs");
const fs = require("fs");
const path = require("path");
const logger =  require("../utils/logger");

const GIFTController = (pathToData) => {
    const basePath = pathToData;

    const readFile = (filename) => {
        const filePath = path.join(basePath, filename);
        let fileContents = fs.readFileSync(filePath, { encoding: "utf-8"});
        let questions = [];
        try {
            questions = parse.parse(fileContents);
        } catch (err) {
            logger.logError(err);
        }
        return questions;
    }

    return {
        readFile
    }
}

module.exports = {
    GIFTController,
}