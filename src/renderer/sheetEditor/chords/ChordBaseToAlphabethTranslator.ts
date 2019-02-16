import { Key } from "../../model/Key";
import { TheoryData } from "./TheoryData";
import { Mode, Modifier } from "../../model/IMusic";

export namespace ChordBaseToAlphabethTranslator {
    export function translate(base: number, modifier: Modifier, key: Key): string {
        const noteList = getSortedKeyList(key, TheoryData.KEY_LIST).map(note => {
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

    function getSortedKeyList(key: Key, keys: string[]): string[] {
        while (!compareKeys(keys[0], key)) {
            keys.push(keys.shift());
        }

        return keys;
    }

    function compareKeys(keyPair: string, key: Key) {
        const splittedKeys: string[] = keyPair.split("/");

        const keySearch = key.isTheoretical()
            ? TheoryData.THEORETICAL_KEYS.get(key.baseToString())
            : key.baseToString();

        return splittedKeys.indexOf(keySearch) > -1;
    }
}
