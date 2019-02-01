import { IElement } from "../../../model/IElement";
import { IElementContainer } from "../../../model/IElementContainer";

export enum LineType {
    Lyric,
    Comment
}

export type LineJson = {
    id: string;
    content: string;
    type: string;
};

export interface ILine extends IElement, IElementContainer {
    type: LineType;
    content: string;

    toJsonObject(): LineJson;
}
