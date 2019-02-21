import { IChordBase } from "./IChordBase";
import { Modifier, Quality } from "./IMusic";
import { Key } from "./Key";
import { MusicUtils } from "../sheetEditor/utils/MusicUtils";
import { ChordBaseToAlphabethTranslator } from "../sheetEditor/chords/ChordBaseToAlphabethTranslator";

export class ChordBase implements IChordBase {
    constructor(
        public base: number,
        public modifier: Modifier = Modifier.None,
        public quality: Quality = Quality.Major,
        public adjectives: string = "",
        public inversionBase?: number,
        public inversionModifier: Modifier = Modifier.None
    ) {}

    toNashvilleString(): string {
        let nashvilleString = `${this.base}${MusicUtils.modifierToString(this.modifier)}${MusicUtils.qualityToString(
            this.quality,
            true
        )}${this.adjectives}`;

        if (this.inversionBase) {
            nashvilleString += `/${this.inversionBase}${MusicUtils.modifierToString(this.inversionModifier)}`;
        }

        return nashvilleString;
    }

    toAlphabethString(key: Key): string {
        const baseTranslation = ChordBaseToAlphabethTranslator.translate(this.base, this.modifier, key);

        let alphabethString = `${baseTranslation}${MusicUtils.qualityToString(this.quality)}${this.adjectives}`;

        if (this.inversionBase) {
            const inversionBaseTranslation = ChordBaseToAlphabethTranslator.translate(
                this.inversionBase,
                this.inversionModifier,
                key
            );

            alphabethString += `/${inversionBaseTranslation}`;
        }

        if (!baseTranslation) {
            return this.toNashvilleString();
        }

        return alphabethString;
    }

    updateChord(chord: ChordBase): IChordBase {
        this.base = chord.base;
        this.modifier = chord.modifier;
        this.quality = chord.quality;
        this.adjectives = chord.adjectives;
        this.inversionBase = chord.inversionBase;
        this.inversionModifier = chord.inversionModifier;

        return this;
    }

    toString(): string {
        return this.base.toString();
    }
}
