import { IElement } from "./IElement";
import { IElementContainer } from "./IElementContainer";
import { ChordJson, IChord } from "./IChord";
import { IChordBase } from "./IChordBase";

export enum LineType {
    Lyric,
    Comment
}

export type LineJson = {
    id: string;
    content: string;
    type: string;
    chords: ChordJson[];
};

export interface ILine extends IElement, IElementContainer {
    type: LineType;
    content: string;
    chords: IChord[];
    hasChords: boolean;

    addChord(base: IChordBase, position: number): IChord;
    removeChord(chord: IChord): void;

    toJsonObject(): LineJson;
}
