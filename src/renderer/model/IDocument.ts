import { Key } from './Key';

export interface IDocument {
    ID: string;

    title: string;
    subtitle: string;

    key: Key;
    capo: number;

    sections: [];

    toJson(): string;
}
