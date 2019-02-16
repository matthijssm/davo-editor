import { Key } from "../../../model/Key";
import { Note, Modifier, Mode } from "../../../model/IMusic";
import Container from "typedi";
import { ChordTranslator } from "../ChordTranslator";

describe("sheetEditor.chords.ChordTranslator", () => {
    let translator: ChordTranslator;

    beforeAll(() => {
        translator = Container.get(ChordTranslator);
    });

    it("should translate chords in the C key", () => {
        const key = new Key(Note.C, Modifier.None, Mode.Major);

        expect(translator.translateNashville("1", key)).toBe("C");
        expect(translator.translateNashville("2", key)).toBe("D");
        expect(translator.translateNashville("4", key)).toBe("F");
    });

    it("should translate chords in the C flat key", () => {
        const key = new Key(Note.C, Modifier.Flat, Mode.Major);

        expect(translator.translateNashville("1", key)).toBe("B");
        expect(translator.translateNashville("2", key)).toBe("Db");
        expect(translator.translateNashville("4", key)).toBe("E");
        expect(translator.translateNashville("5", key)).toBe("Gb");
    });
});
