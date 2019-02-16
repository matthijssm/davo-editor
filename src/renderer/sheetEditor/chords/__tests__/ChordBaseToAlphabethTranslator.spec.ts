import { ChordBaseToAlphabethTranslator } from "../ChordBaseToAlphabethTranslator";
import { Note, Modifier } from "../../../model/IMusic";
import { Key } from "../../../model/Key";
import { ChordBase } from "../../../model/ChordBase";

describe("sheetEditor.chords.ChordBaseToAlphabethTranslator", () => {
    it("should correctly translate nashville base to a alphabeth base in the key of E", () => {
        const translate = ChordBaseToAlphabethTranslator.translate;

        const key = new Key(Note.E);

        const firstChord = new ChordBase(1);
        const secondChord = new ChordBase(4, Modifier.Sharp);

        expect(translate(firstChord.base, firstChord.modifier, key)).toBe("E");
        expect(translate(secondChord.base, secondChord.modifier, key)).toBe("A#");
    });

    it("should correctly translate nashville base to a alphabeth base in the key of F", () => {
        const translate = ChordBaseToAlphabethTranslator.translate;

        const key = new Key(Note.F);

        const firstChord = new ChordBase(3);
        const secondChord = new ChordBase(6, Modifier.Sharp);

        expect(translate(firstChord.base, firstChord.modifier, key)).toBe("A");
        expect(translate(secondChord.base, secondChord.modifier, key)).toBe("Eb");
    });
});
