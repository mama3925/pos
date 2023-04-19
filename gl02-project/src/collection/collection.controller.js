var logger = require("../utils/logger");
var prettyJson = require("prettyjson");
var fs = require("fs");
var path = require("path");

const CollectionController = () => {

    const create = () => {
        return [];
    }

    const append = (c, q) => {
        c.push(q);
        return c;
    }

    const isInCollection = (c, q) => {
        return c.includes(q);
    }

    const length = (c) => {
        return c.length;
    }

    const isLengthValid = (c) => {
        return 15 <= c.length && c.length <= 20;
    }

    const appendExam = (c, q) => {
        if (isInCollection(c, q)) {
            logger.logWarning("La question est déjà présente dans l'examen'.");
            return c;
        } else if ([...c, q].length > 20) {
            logger.logWarning("L'examen ne peut pas comporter plus de 20 questions.");
            return c;
        } else {
            return append(c, q);
        }
    }

    const merge = (c1, c2) => {
        return c1.concat(c2);
    }

    const find = (c, type, keyword) => {
        let c_with_type = c.filter(q => q.type === type);
        if (keyword !== undefined) {
            if (typeof keyword === "string" || keyword instanceof String) {
                return c_with_type.filter(q => {
                    return Object.values(q).includes(keyword);
                });
            } else if (Array.isArray(keyword)) {
                return c_with_type.filter(q => {
                    let values = Object.values(q);
                    for (const kw of keyword) {
                        if (values.includes(kw)) {
                            return true;
                        }
                    }
                });
            }
        }
        return c_with_type;
    }

    const print = (c) => {
        c.forEach(q => {
            console.log(prettyJson.render(q));
            console.log("-".repeat(process.stdout.columns));
        });
    }

    const getById = (c, id) => {
        let matchingIds = [];
        c.forEach(q => {
            if (id.includes(q.id) && !isInCollection(matchingIds, q)) {
                matchingIds.push(q);
            }
        });

        return matchingIds;
    }

    const saveExam = (c, title) => {
        fs.writeFile(path.join(__dirname, `./../../exams/${title}.json`), JSON.stringify({exam: c}), (err) => {
            if (err) logger.logError(err);
        });
    }

    const getFromFile = (title) => {
        try {
            let file = fs.readFileSync(path.join(__dirname, `./../../exams/${title}.json`));
            return JSON.parse(file).exam;
        } catch (err) {
            logger.logError("L'examen n'a pas pu être retrouvé");
        }
        
    }

    return {
        create,
        append,
        isInCollection,
        length,
        isLengthValid,
        appendExam,
        merge,
        find,
        print,
        getById,
        saveExam,
        getFromFile
    }
}

module.exports = {
    CollectionController
}