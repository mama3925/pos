const Question = () => {
    const QuestionWithStem = ["MC", "Numerical", "Short", "Essay", "TF", "Matching"];

    const create = () => {
        return {};
    }

    const getStem = (q) => {
        if ("stem" in q) {
            return q.stem.text;
        }
        return q.title ?? "La question ne comporte pas d'énoncé.";
    }

    const getAnswer = (q) => {
        if ("choices" in q) {
            /*
            we have to check if q.choices has the property "length" to check if it is an array
            see => gitf-pegjs/index.d.ts => interface Numerical
            */
            let res = "";
            if ("length" in q.choices) {
                q.choices.forEach(ans => {
                    if (ans.isCorrect) {
                        if ("text" in ans.text) {
                            res = ans.text.text;
                        } else {
                            res = `${ans.text.numberLow}:${ans.text.number}:${ans.text.numberHigh}`;
                        }
                    }
                })
            } else {
                res = res = `${q.choices.numberLow}:${q.choices.number}:${q.choices.numberHigh}`;
            }
            return res;
        }
        if ("isTrue" in q) {
            return q.isTrue ? "Vrai" : "Faux";
        }
        if ("matchPairs" in q) {
            return q.matchPairs.toString()
        }
        return "ERROR 418 ^^";
    }

    const isEqual = (q1, q2) => {
        if (q1.type !== q2.type) return false;

        if ("stem" in q1 && "stem" in q2) {
            return q1.stem.text === q2.stem.text;
        }
        return q1.title === q2.title;
    }

    const isAnswerValid = (q, a) => {
        let ans = getAnswer(q);

        let isValid = false;
        if ("choices" in q) {
            if ("length" in q.choices) {
                if (!("text" in q.choices[0])) {
                    let range = ans.split(":");
                    isValid = +range[0] <= +a && +a <= +range[2];
                } else {
                    isValid = ans === a;
                }
            } else {
                console.log("sup")
                let range = ans.split(":");
                isValid = +range[0] <= +a && +a <= +range[2];
            }
        } else {
            console.log("here")
        }
        return isValid;
    }

    return {
        create,
        getStem,
        getAnswer,
        isEqual,
        isAnswerValid
    }
}

module.exports = {
    Question
}