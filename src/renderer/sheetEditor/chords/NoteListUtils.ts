import { Key } from "../../model/Key";
import { TheoryData } from "./TheoryData";

export namespace NoteListUtils {
    export function createNoteList(key: Key, keys: string[]): string[] {
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

    export function findIndex(noteList: string[], search: string) {
        let searchString = search;

        if (TheoryData.THEORETICAL_KEYS.has(search)) {
            searchString = TheoryData.THEORETICAL_KEYS.get(search);
        }

        return noteList.findIndex(pair => {
            const splitPair = pair.split("/");

            return splitPair.indexOf(searchString) > -1;
        });
    }
}
