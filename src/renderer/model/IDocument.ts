import { Key } from "./Key";
import { ISection } from "./ISection";
import { IElementContainer } from "./IElementContainer";
import { IElement } from "./IElement";

export interface IDocument extends IElementContainer {
    ID: string;

    title: string;
    subtitle: string;

    key: Key;
    capo: number;
    tempo: number;

    sections: ISection[];

    toJson(): string;
}
