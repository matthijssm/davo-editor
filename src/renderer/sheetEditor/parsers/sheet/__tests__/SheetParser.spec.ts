import { SheetParser } from "../SheetParser";
import { KeyUtils } from "../../utils/KeyUtils";

describe("sheetEditor.parsers.sheet.SheetParser", () => {
    it("should parse sheet parts correctly", () => {
        const sheetParts = `[Verse 1]
Em7                  D                       C
   Before I spoke a word, You were singing over me
Em7               D              C
   You have been so, so good to me
Em7                 D                          C
   Before I took a breath, You breathed Your life in me
Em7               D              C
   You have been so, so kind to me  `;

        const key = KeyUtils.fromString("G");

        const parts = SheetParser.parsePartial(sheetParts, key);

        expect(parts.length).toBe(1);
        expect(parts[0].lines.length).toBe(5);
        expect(parts[0].lines[0].content).toBe("[Verse 1]");
        expect(parts[0].lines[1].content).toBe("   Before I spoke a word, You were singing over me");
        expect(parts[0].lines[1].chords[0].toAlphabethString(key)).toBe("Em7");
        expect(parts[0].lines[1].chords.length).toBe(3);
        expect(parts[0].lines[1].chords[0].position).toBe(0);
    });

    it("should parse simple lines", () => {
        const sheetParts = `Before I spoke a word, You were singing over me
You have been so, so good to me
Before I took a breath, You breathed Your life in me
You have been so, so kind to me  `;

        const key = KeyUtils.fromString("G");

        const parts = SheetParser.parsePartial(sheetParts, key);

        expect(parts.length).toBe(1);
        expect(parts[0].lines.length).toBe(4);
        expect(parts[0].lines[0].hasChords).toBeFalsy();
        expect(parts[0].lines[0].content).toBe("Before I spoke a word, You were singing over me");
    });
});
