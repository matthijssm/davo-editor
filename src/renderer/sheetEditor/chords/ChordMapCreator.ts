import { IChordBase } from "../../model/IChordBase";
import { Key } from "../../model/Key";
import { Mode, Modifier } from "../../model/IMusic";
import { TheoryData } from "./TheoryData";
import { ChordBase } from "../../model/ChordBase";

export namespace ChordMapCreator {
    export function createMap(key: Key): IChordBase[] {
        const map = key.mode === Mode.Major ? TheoryData.MAJOR_NASHVILLE : TheoryData.MINOR_NASHVILLE;

        const collection: IChordBase[] = [];

        map.forEach(theory => {
            collection.push(new ChordBase(theory.degree, Modifier.None, theory.defaultQuality));
        });

        return collection;
    }
}
