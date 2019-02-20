import { Key } from "../../../model/Key";
import { AlphabetToChordBaseTranslator } from "../AlphabetToChordBaseTranslator";
import { Note, Modifier, Quality, Mode } from "../../../model/IMusic";

describe("sheetEditor.chords.AlphabetToChordBaseTranslator", () => {
    it("should correctly translate alphabeth to a nashville chord in the key of E", () => {
        const translate = AlphabetToChordBaseTranslator.translate;

        const key = new Key(Note.E);

        const chordBase = translate("C#m7", key);

        expect(chordBase).not.toBeNull();

        expect(chordBase.base).toBe(6);
        expect(chordBase.adjectives).toBe("7");
        expect(chordBase.modifier).toBe(Modifier.None);
        expect(chordBase.quality).toBe(Quality.Minor);
    });

    it("should correctly translate alphabeth to a nashville chord in the key of E", () => {
        const translate = AlphabetToChordBaseTranslator.translate;

        const key = new Key(Note.E);

        const chordBase = translate("Gaugadd8/C", key);

        expect(chordBase).not.toBeNull();

        expect(chordBase.base).toBe(2);
        expect(chordBase.modifier).toBe(Modifier.Sharp);
        expect(chordBase.adjectives).toBe("add8");
        expect(chordBase.quality).toBe(Quality.Augmented);
        expect(chordBase.inversionBase).toBe(5);
        expect(chordBase.inversionModifier).toBe(Modifier.Sharp);
    });

    it("should return null if the chord is invalid.", () => {
        const translate = AlphabetToChordBaseTranslator.translate;

        const key = new Key(Note.E);

        const chordBase = translate("XXXXXXX", key);

        expect(chordBase).toBeNull();
    });

    it("should go over the index correctly", () => {
        const translate = AlphabetToChordBaseTranslator.translate;

        const key = new Key(Note.G, Modifier.None, Mode.Minor);

        const chordBase = translate("F#", key);

        expect(chordBase).not.toBeNull();

        expect(chordBase.base).toBe(7);
        expect(chordBase.modifier).toBe(Modifier.Sharp);
    });
});
