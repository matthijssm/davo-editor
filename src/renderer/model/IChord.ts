import { IChordBase } from "./IChordBase";

export interface ChordJson {
    id: string;
    position: number;
    order: number;
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
    order: number;
    toJsonObject(): ChordJson;
}
