import { IChordBase } from "./IChordBase";
import { Modifier, Quality } from "./IMusic";

export interface ChordJson {
    id: string;
    position: number;
    base: number;
    modifier: string;
    quality: string;
    adjectives: string;
    inversionBase: number;
    inversionModifier: string;
}

export interface IChord extends IChordBase {
    id: string;
    position: number;
    toJsonObject(): ChordJson;
}
