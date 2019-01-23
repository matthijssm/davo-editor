import { extendObservable, observable } from 'mobx';

export enum Mode {
    Major,
    Minor,
}

export enum Note {
    A,
    B,
    C,
    D,
    E,
    F,
    G,
}

export enum Modifier {
    Sharp,
    Flat,
    None,
}

export type IKeyJson = {
    note: string;
    modifier: string;
    mode: string;
};

export class Key {
    @observable
    public note: Note;
    @observable
    public modifier: Modifier;
    @observable
    public mode: Mode;

    constructor(
        note: Note = Note.A,
        modifier: Modifier = Modifier.None,
        mode: Mode = Mode.Major
    ) {
        this.note = note;
        this.modifier = modifier;
        this.mode = mode;
    }

    toJsonObject(): IKeyJson {
        return {
            note: Note[this.note],
            modifier: Modifier[this.modifier],
            mode: Mode[this.mode],
        };
    }

    toString(): string {
        return `${
            Note[this.note]
        }${this.getModifierString()}${this.getModeString()}`;
    }

    private getModifierString(): string {
        if (this.modifier === Modifier.Flat) {
            return 'b';
        }

        if (this.modifier === Modifier.Sharp) {
            return '#';
        }

        return '';
    }

    private getModeString(): string {
        if (this.mode === Mode.Minor) return 'm';
        return '';
    }
}
