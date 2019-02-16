import { Service } from "typedi";

import { Modifier, Quality, Note, Mode } from "../../model/IMusic";
import { TheoryData, NashvilleTheoryMap, NashvilleTheory } from "./TheoryData";
import { Key } from "../../model/Key";
import { MusicUtils } from "../utils/MusicUtils";

type NashvilleInfo = { degree: number; modifier: Modifier };
type NashvilleTuple = [string, NashvilleInfo];

type ChordToNashvilleMap = Map<string, NashvilleInfo>;
type NashvilleToChordMap = Map<string, string>;

@Service()
export class ChordTranslator {
    private nashvilleToChordMaps: Map<string, NashvilleToChordMap> = new Map<string, NashvilleToChordMap>();
    private chordToNashvilleMaps: Map<string, ChordToNashvilleMap> = new Map<string, ChordToNashvilleMap>();

    private lastAddedTuple: NashvilleTuple | null = null;

    translateNashville(nashvilleBase: string, key: Key): string {
        const map = this.findOrCreateNashvilleToChordMap(key);

        return map.get(nashvilleBase);
    }

    private findOrCreateNashvilleToChordMap(key: Key): Map<string, string> {
        if (this.nashvilleToChordMaps.has(key.toString())) {
            return this.nashvilleToChordMaps.get(key.toString());
        } else {
            const chordToNashvilleMap = this.findOrCreateChordToNashvilleMap(key);
            const map = this.createNashvilleToChordMap(chordToNashvilleMap, key);
            this.nashvilleToChordMaps.set(key.toString(), map);
            return map;
        }
    }

    private findOrCreateChordToNashvilleMap(key: Key): Map<string, NashvilleInfo> {
        if (this.chordToNashvilleMaps.has(key.toString())) {
            return this.chordToNashvilleMaps.get(key.toString());
        } else {
            const map = this.createChordToNashvilleMap(key);
            this.chordToNashvilleMaps.set(key.toString(), map);
            return map;
        }
    }

    private createNashvilleToChordMap(chordToNashvilleMap: Map<string, NashvilleInfo>, key: Key): Map<string, string> {
        const map = new Map<string, string>();

        chordToNashvilleMap.forEach((nashvilleInfo, chordBase) => {
            const nashvilleBase = `${nashvilleInfo.degree}${MusicUtils.modifierToString(nashvilleInfo.modifier)}`;
            if (key.getModifierMode() === Modifier.Sharp && map.has(nashvilleBase)) {
                // Skip
            } else {
                map.set(nashvilleBase, chordBase);
            }
        });

        return map;
    }

    private createChordToNashvilleMap(baseKey: Key): Map<string, NashvilleInfo> {
        const chordToNashvilleMap = new Map<string, NashvilleInfo>();

        const keyList = this.getSortedKeyList(baseKey, TheoryData.KEY_LIST);

        const nashVilleMap = baseKey.mode === Mode.Minor ? TheoryData.MINOR_NASHVILLE : TheoryData.MAJOR_NASHVILLE;

        keyList.forEach((key, index) => {
            if (key.match(/\//g)) {
                // Key string contains two keys that need to be added to the new map.
                const splittedKeys: string[] = key.split("/");

                // Use the order to decide for a sharp or flat adjustment.
                splittedKeys.forEach((splitKey, splitIndex) => {
                    const mode = splitIndex > 0 ? Modifier.Flat : Modifier.Sharp;

                    const tuple = this.generateChordToNashvilleTuple(splitKey, index, nashVilleMap, mode);

                    this.addNashvilleTupleToMap(tuple, chordToNashvilleMap);
                });
            } else {
                // Execute tupel generator once for this key.
                // Use current mode to decide for # or b adjustment.
                const tuple = this.generateChordToNashvilleTuple(key, index, nashVilleMap, baseKey.getModifierMode());

                this.addNashvilleTupleToMap(tuple, chordToNashvilleMap);
            }
        });

        return chordToNashvilleMap;
    }

    private addNashvilleTupleToMap(tuple: NashvilleTuple, map: Map<string, NashvilleInfo>): void {
        map.set(tuple[0], tuple[1]);
        this.lastAddedTuple = tuple;
    }

    private generateChordToNashvilleTuple(
        key: string,
        index: number,
        nashVilleMap: NashvilleTheoryMap,
        mode: Modifier
    ): NashvilleTuple {
        if (nashVilleMap.has(index)) {
            const theory: NashvilleTheory = nashVilleMap.get(index);

            const newTuple: NashvilleTuple = [key, { degree: theory.degree, modifier: Modifier.None }];

            return newTuple;
        } else {
            const lastDegree = this.lastAddedTuple ? this.lastAddedTuple[1].degree : 1;

            const degree = mode === Modifier.Flat ? lastDegree + 1 : lastDegree;

            const newTuple: NashvilleTuple = [key, { degree: degree, modifier: mode }];

            return newTuple;
        }
    }

    private getSortedKeyList(key: Key, keys: string[]): string[] {
        while (!this.compareKeys(keys[0], key)) {
            keys.push(keys.shift());
        }

        return keys;
    }

    private compareKeys(keyPair: string, key: Key) {
        const splittedKeys: string[] = keyPair.split("/");

        const keySearch = key.isTheoretical()
            ? TheoryData.THEORETICAL_KEYS.get(key.baseToString())
            : key.baseToString();

        return splittedKeys.indexOf(keySearch) > -1;
    }
}
