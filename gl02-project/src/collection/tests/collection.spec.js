var parse = require("gift-pegjs");
var CollectionController = require("../collection.controller");

describe('Collection tests', () => { 
    it("Create collection", () => {
        const c = CollectionController.CollectionController();
        expect(c.create()).toEqual([]);
    });

    it("Append to collection", () => {
        const c = CollectionController.CollectionController();
        const q = parse.parse("::U9 p94 Listening 4.1::Max says that top sportspeople usually believe their success is due to {~ good fortunehard work.~ raw talent.}");
        expect(c.append([], q[0]).length).toEqual(1);
    })

    it("Is in collection success case", () => {
        const c = CollectionController.CollectionController();
        const q = parse.parse("::U9 p94 Listening 4.1::Max says that top sportspeople usually believe their success is due to {~ good fortunehard work.~ raw talent.}");
        let x = c.append([], q[0]);
        expect(c.isInCollection(x, q[0])).toBeTruthy();
    })

    it("Is in collection success case", () => {
        const c = CollectionController.CollectionController();
        const q = parse.parse("::U9 p94 Listening 4.1::Max says that top sportspeople usually believe their success is due to {~ good fortunehard work.~ raw talent.}");
        expect(c.isInCollection([], q[0])).toBeFalsy();
    })

    it("Check length with filled collection", () => {
        const c = CollectionController.CollectionController();
        const q = parse.parse("::U9 p94 Listening 4.1::Max says that top sportspeople usually believe their success is due to {~ good fortunehard work.~ raw talent.}");
        let x = c.append([], q[0]);
        expect(c.length(x)).toEqual(1);
    })

    it("Check length with empty list", () => {
        const c = CollectionController.CollectionController();
        expect(c.length([])).toEqual(0);
    })

    it("Check length validity with length < 15", () => {
        const c = CollectionController.CollectionController();
        expect(c.isLengthValid([])).toBeFalsy();
    })

    it("Check length validity with length > 20", () => {
        const c = CollectionController.CollectionController();
        const q = parse.parse("::U9 p94 Listening 4.1::Max says that top sportspeople usually believe their success is due to {~ good fortunehard work.~ raw talent.}");
        let x = [];
        for (let i=0; i<=21; i++) {
            x = c.append(x, q[0]);
        }
        expect(c.isLengthValid(x)).toBeFalsy();
    })

    it("Check length validity with length > 20", () => {
        const c = CollectionController.CollectionController();
        const q = parse.parse("::U9 p94 Listening 4.1::Max says that top sportspeople usually believe their success is due to {~ good fortunehard work.~ raw talent.}");
        let x = [];
        for (let i=0; i<=17; i++) {
            x = c.append(x, q[0]);
        }
        expect(c.isLengthValid(x)).toBeTruthy();
    })

    it("Append exam with question already in collection", () => {
        const c = CollectionController.CollectionController();
        const q = parse.parse("::U9 p94 Listening 4.1::Max says that top sportspeople usually believe their success is due to {~ good fortunehard work.~ raw talent.}");
        let x = [q[0]];
        expect(c.length(c.appendExam(x, q[0]))).toEqual(1);
    })

    it("Append exam with question not in collection", () => {
        const c = CollectionController.CollectionController();
        const q = parse.parse("::U9 p94 Listening 4.1::Max says that top sportspeople usually believe their success is due to {~ good fortunehard work.~ raw talent.}");
        let x = [];
        expect(c.length(c.appendExam(x, q[0]))).toEqual(1);
    })
})