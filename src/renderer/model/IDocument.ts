import { Key } from "./Key";
import { Section } from "./Section";

export interface IDocument {
    ID: string;

    title: string;
    subtitle: string;

    key: Key;
    capo: number;
    tempo: number;

    sections: Section[];

    toJson(): string;
}
