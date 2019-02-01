import { IElement } from "./IElement";
import { ILine } from "../sheetEditor/components/sheet/ILine";
import { SectionJson } from "./Section";
import { IElementContainer } from "./IElementContainer";

export interface ISection extends IElement, IElementContainer {
    label: string;

    lines: ILine[];

    toJsonObject(): SectionJson;
    addLine(value: string, after?: ILine): ILine;
    removeLine(value: string, line: ILine): ILine;
}
