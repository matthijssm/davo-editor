import { Key } from "../../model/Key";
import { TheoryData } from "./TheoryData";
import { Mode, Modifier } from "../../model/IMusic";
import { NoteListUtils } from "./NoteListUtils";

export namespace ChordBaseToAlphabethTranslator {
    export function translate(base: number, modifier: Modifier, key: Key): string {
        const noteList = NoteListUtils.createNoteList(key, TheoryData.KEY_LIST).map(note => {
            const splittedNote: string[] = note.split("/");

            if (splittedNote.length > 1) {
                return key.getModifierMode() === Modifier.Sharp ? splittedNote[0] : splittedNote[1];
            }

            return note;
        });

        const indexMap = key.mode === Mode.Major ? TheoryData.MAJOR_INDEX_MAP : TheoryData.MINOR_INDEX_MAP;

        let index = indexMap.get(base);

        if (modifier === Modifier.Sharp) {
            index++;
        } else if (modifier === Modifier.Flat) {
            index--;
        }

        return noteList[index];
    }
}
