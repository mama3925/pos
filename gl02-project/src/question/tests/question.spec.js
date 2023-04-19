var parse = require("gift-pegjs");
var Question = require("../question.controller");

describe('Question tests', () => { 
    it("Create collection", () => {
        const q = Question.Question();
        expect(q.create()).toEqual({});
    });

    it("Get stem", () => {
        const q = Question.Question();
        const p = parse.parse("::U9 p94 Listening 4.1::Max says that top sportspeople usually believe their success is due to {~ good fortune.= hard work.~ raw talent.}");
        expect(q.getStem(p[0])).toEqual("Max says that top sportspeople usually believe their success is due to");
    });

    it("Is equal with the same question", () => {
        const q = Question.Question();
        const p = parse.parse("::U9 p94 Listening 4.1::Max says that top sportspeople usually believe their success is due to {~ good fortune.= hard work.~ raw talent.}");
        expect(q.isEqual(p[0], p[0])).toBeTruthy();
    });

    it("Is equal with different questions", () => {
        const q = Question.Question();
        const p1 = parse.parse("::U9 p94 Listening 4.1::Max says that top sportspeople usually believe their success is due to {~ good fortune.= hard work.~ raw talent.}");
        const p2 = parse.parse("::U7 p79 Review 3.2::I need to get a _________ ticket because I am coming back this evening.{~round=return~package~direct}");
        expect(q.isEqual(p1[0], p2[0])).toBeFalsy();
    });

    it("Get answer", () => {
        const q = Question.Question();
        const p = parse.parse("::U9 p94 Listening 4.1::Max says that top sportspeople usually believe their success is due to {~ good fortune.= hard work.~ raw talent.}");
        expect(q.getAnswer(p[0])).toEqual("hard work.");
    });

    it("Is answer valid with wrong answer", () => {
        const q = Question.Question();
        const p = parse.parse("::U9 p94 Listening 4.1::Max says that top sportspeople usually believe their success is due to {~ good fortune.= hard work.~ raw talent.}");
        expect(q.isAnswerValid(p[0], "a false answer")).toBeFalsy();
    });

    it("Is answer valid with right answer", () => {
        const q = Question.Question();
        const p = parse.parse("::U9 p94 Listening 4.1::Max says that top sportspeople usually believe their success is due to {~ good fortune.= hard work.~ raw talent.}");
        expect(q.isAnswerValid(p[0], "hard work.")).toBeTruthy();
    });
})