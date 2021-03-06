import { observable } from "mobx";
import * as uuid from "uuid";

import { ChordBase } from "./ChordBase";
import { IChord, ChordJson } from "./IChord";
import { Modifier, Quality } from "./IMusic";
import { IChordBase } from "./IChordBase";

export class Chord extends ChordBase implements IChord {
    id: string;
    @observable position: number;
    @observable order: number;

    constructor(chordBase: IChordBase, position?: number, order?: number, id?: string) {
        super(
            chordBase.base,
            chordBase.modifier,
            chordBase.quality,
            chordBase.adjectives,
            chordBase.inversionBase,
            chordBase.inversionModifier
        );

        this.id = id ? id : uuid.v4();
        this.position = position ? position : 0;
        this.order = order ? order : 0;
    }

    updateChord(chord: ChordBase): IChord {
        super.updateChord(chord);
        return this;
    }

    toJsonObject(): ChordJson {
        return {
            id: this.id,
            position: this.position,
            order: this.order,
            base: this.base,
            modifier: Modifier[this.modifier],
            quality: Quality[this.quality],
            adjectives: this.adjectives,
            inversionBase: this.inversionBase,
            inversionModifier: Modifier[this.inversionModifier]
        };
    }
}
