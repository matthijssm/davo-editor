import { Modifier, Quality } from "./IMusic";
import { Key } from "./Key";
import { ChordBase } from "./ChordBase";

export interface IChordBase {
    base: number;
    modifier: Modifier;
    quality: Quality;
    adjectives: string;
    inversionBase?: number;
    inversionModifier: Modifier;

    toAlphabethString(key: Key): string;

    updateChord(chord: ChordBase): IChordBase;

    toString(): string;
}
