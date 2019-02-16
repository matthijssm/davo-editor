import { Modifier, Quality } from "./IMusic";
import { Key } from "./Key";

export interface IChordBase {
    base: number;
    modifier: Modifier;
    quality: Quality;
    adjectives: string;
    inversionBase?: number;
    inversionModifier: Modifier;

    toAlphabethString(key: Key): string;

    toString(): string;
}
