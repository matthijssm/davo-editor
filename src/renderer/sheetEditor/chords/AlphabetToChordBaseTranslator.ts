import { Key } from "../../model/Key";
import { ChordBase } from "../../model/ChordBase";
import { NoteListUtils } from "./NoteListUtils";
import { TheoryData } from "./TheoryData";
import { Mode, Modifier, Quality } from "../../model/IMusic";

type NashvilleDegree = {
    degree: number;
    modifier: Modifier;
};

export namespace AlphabetToChordBaseTranslator {
    export function translate(chord: string, key: Key): ChordBase | null {
        const chordRegex = /([A-G]|[a-g])(#|b)?([^/\s]*)(\/([A-G])(#|b)?)?/i;

        const parts = chordRegex.exec(chord);

        if (parts) {
            const [, base, modifier, suffix, , bassBase, bassModifier] = parts;

            const nashVilleChordBase = getNashvilleDegree(cleanBase(base), modifier, key);

            const quality = getQuality(suffix);

            const adjectives = cleanAdjectives(suffix, quality);

            const nashvilleBassBase = bassBase ? getNashvilleDegree(cleanBase(bassBase), bassModifier, key) : undefined;

            if (nashVilleChordBase) {
                return new ChordBase(
                    nashVilleChordBase.degree,
                    nashVilleChordBase.modifier,
                    quality,
                    adjectives,
                    nashvilleBassBase ? nashvilleBassBase.degree : undefined,
                    nashvilleBassBase ? nashvilleBassBase.modifier : undefined
                );
            }
        }

        return null;
    }

    function cleanBase(base: string): string {
        return base.trim().toUpperCase();
    }

    function cleanAdjectives(suffix: string, quality: Quality): string {
        switch (quality) {
            case Quality.Augmented:
                return suffix.replace(TheoryData.REGEX_AUGMENTED_CHORD, "");
            case Quality.Dimished:
                return suffix.replace(TheoryData.REGEX_DIMINISHED_CHORD, "");
            case Quality.Minor:
                return suffix.replace(TheoryData.REGEX_MINOR_CHORD, "");
            default:
                return suffix;
        }
    }

    function getQuality(suffix: string): Quality {
        if (suffix.match(TheoryData.REGEX_MINOR_CHORD)) {
            return Quality.Minor;
        }

        if (suffix.match(TheoryData.REGEX_DIMINISHED_CHORD)) {
            return Quality.Dimished;
        }

        if (suffix.match(TheoryData.REGEX_AUGMENTED_CHORD)) {
            return Quality.Augmented;
        }

        return Quality.Major;
    }

    function getNashvilleDegree(note: string, modifier: string, key: Key): NashvilleDegree | null {
        const chordBase = `${note}${modifier ? modifier : ""}`;

        const noteList = NoteListUtils.createNoteList(key, TheoryData.KEY_LIST);

        const index = NoteListUtils.findIndex(noteList, chordBase);

        return createNashvilleDegree(index, key);
    }

    function createNashvilleDegree(index: number, key: Key, modifierOverwrite?: Modifier): NashvilleDegree | null {
        const dataMap = key.mode === Mode.Major ? TheoryData.MAJOR_NASHVILLE : TheoryData.MINOR_NASHVILLE;

        if (index >= 0 && dataMap.has(index)) {
            return {
                degree: dataMap.get(index).degree,
                modifier: modifierOverwrite !== undefined ? modifierOverwrite : Modifier.None
            };
        } else if (modifierOverwrite === undefined) {
            if (key.getModifierMode() === Modifier.Sharp) {
                return createNashvilleDegree(index - 1, key, Modifier.Sharp);
            }

            return createNashvilleDegree(index + 1, key, Modifier.Flat);
        }

        return null;
    }
}
