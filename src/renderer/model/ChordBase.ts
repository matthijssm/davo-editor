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

        return alphabethString;
    }

    toString(): string {
        return this.base.toString();
    }
}
