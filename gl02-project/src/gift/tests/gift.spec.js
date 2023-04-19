var GIFTController = require("../gift.controller");

describe('GIFT tests', () => {
    it("Test readFile with wrong path", () => {
        const giftController = GIFTController.GIFTController(__dirname);
        expect(() => giftController.readFile("noSuchFile.gift")).toThrowError();
    });

    it("Test readFile with empty file", () => {
        const giftController = GIFTController.GIFTController(__dirname);
        expect(giftController.readFile("emptyFile.gift")).toEqual([]);
    });

    it("Test readFile with file", () => {
        const giftController = GIFTController.GIFTController(__dirname);
        expect(giftController.readFile("completeFile.gift").length).toBeGreaterThan(0);
    });
});