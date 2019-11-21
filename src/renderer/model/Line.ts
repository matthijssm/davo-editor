import { observable, action, computed } from "mobx";
import * as uuid from "uuid";

import { ILine, LineType, LineJson } from "./ILine";
import { IElement } from "./IElement";
import { IChord } from "./IChord";
import { IChordBase } from "./IChordBase";
import { Chord } from "./Chord";
import { ISection } from "./ISection";

export class Line implements ILine {
    id: string;
    @observable content: string;
    @observable type: LineType = LineType.Lyric;

    @observable chords: IChord[] = [];

    constructor(id?: string, content?: string) {
        this.id = id ? id : uuid.v4();
        this.content = content ? content : "";
    }

    @computed
    get displayContent(): string {
        return ` ${this.content} `;
    }

    @computed
    get elements(): IElement[] {
        return [...this.chords];
    }

    @computed
    get hasChords(): boolean {
        return this.chords.length > 0;
    }

    @action
    addChord(chordBase: IChordBase, position: number): IChord {
        const newChord = new Chord(chordBase, position);

        this.chords.push(newChord);

        return newChord;
    }

    @action
    removeChord(chord: IChord): void {
        const findIndex = this.chords.findIndex(listChord => listChord.id === chord.id);
        if (findIndex > -1) {
            this.chords.splice(findIndex, 1);
        } else {
            console.error("Cannot find the chord to remove.");
        }
    }

    toJsonObject(): LineJson {
        return {
            id: this.id,
            content: this.content,
            type: LineType[this.type],
            chords: this.chords.map(chord => chord.toJsonObject())
        };
    }
}
