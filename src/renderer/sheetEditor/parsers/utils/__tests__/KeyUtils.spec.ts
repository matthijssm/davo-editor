import { KeyUtils } from "../KeyUtils";
import { Note, Mode, Modifier } from "../../../../model/IMusic";

describe("sheetEditor.parsers.utils.KeyUtils", () => {
    it("should parse the correct key C", () => {
        const key = KeyUtils.fromString("C");

        expect(key.note).toBe(Note.C);
        expect(key.modifier).toBe(Modifier.None);
        expect(key.mode).toBe(Mode.Major);
    });

    it("should parse correct key G#m", () => {
        const key = KeyUtils.fromString("G#m");

        expect(key.note).toBe(Note.G);
        expect(key.modifier).toBe(Modifier.Sharp);
        expect(key.mode).toBe(Mode.Minor);
    });

    it("should parse correct key Dbm", () => {
        const key = KeyUtils.fromString("Dbm");

        expect(key.note).toBe(Note.D);
        expect(key.modifier).toBe(Modifier.Flat);
        expect(key.mode).toBe(Mode.Minor);
    });

    it("should parse correct key fm", () => {
        const key = KeyUtils.fromString("fm");

        expect(key.note).toBe(Note.F);
        expect(key.modifier).toBe(Modifier.None);
        expect(key.mode).toBe(Mode.Minor);
    });

    it("should throw an error when an invalid key is given", () => {
        expect(() => {
            KeyUtils.fromString("HA#m");
        }).toThrow("Key cannot be parsed");
    });
});
