import { observable } from "mobx";
import { Note, Mode, Modifier } from "./IMusic";
import { MusicUtils } from "../sheetEditor/utils/MusicUtils";
import { TheoryData } from "../sheetEditor/chords/TheoryData";

export type IKeyJson = {
    note: string;
    modifier: string;
    mode: string;
};

export class Key {
    @observable
    note: Note;
    @observable
    modifier: Modifier;
    @observable
    mode: Mode;

    constructor(note: Note = Note.A, modifier: Modifier = Modifier.None, mode: Mode = Mode.Major) {
        this.note = note;
        this.modifier = modifier;
        this.mode = mode;
    }

    toJsonObject(): IKeyJson {
        return {
            note: Note[this.note],
            modifier: Modifier[this.modifier],
            mode: Mode[this.mode]
        };
    }

    toString(): string {
        return `${Note[this.note]}${this.getModifierString()}${this.getModeString()}`;
    }

    baseToString(): string {
        return `${Note[this.note]}${this.getModifierString()}`;
    }

    isTheoretical(): boolean {
        return TheoryData.THEORETICAL_KEYS.has(this.baseToString());
    }

    private getModifierString(): string {
        return MusicUtils.modifierToString(this.modifier);
    }

    private getModeString(): string {
        return MusicUtils.modeToString(this.mode);
    }

    getModifierMode(): Modifier.Flat | Modifier.Sharp {
        if (this.modifier !== Modifier.None) {
            return this.modifier;
        }

        if (this.note === Note.F) {
            return Modifier.Flat;
        }

        return Modifier.Sharp;
    }
}
