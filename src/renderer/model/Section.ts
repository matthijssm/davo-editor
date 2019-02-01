import uuid from "uuid";

import { ISection } from "./ISection";
import { observable } from "mobx";
import { ILine, LineJson } from "../sheetEditor/components/sheet/ILine";
import { Line } from "./Line";
import { IElement } from "./IElement";

export type SectionJson = {
    id: string;
    label: string;
    lines: LineJson[];
};

export class Section implements ISection {
    id: string;
    @observable label: string = "";
    @observable lines: ILine[] = [];

    constructor(id?: string) {
        this.id = id ? id : uuid.v4();
        this.lines.push(new Line());
    }

    get elements(): IElement[] {
        const collection: IElement[] = [];

        this.lines.forEach(line => {
            collection.push(line);
            collection.push(...line.elements);
        });

        return collection;
    }

    addLine(value: string, after?: ILine): ILine {
        const newLine = new Line(null, value);

        if (after) {
            const lineIndex = this.lines.findIndex(line => line.id === after.id);

            this.lines.splice(lineIndex + 1, 0, newLine);
        } else {
            this.lines.push(newLine);
        }

        return newLine;
    }

    removeLine(value: string, removableLine: ILine): ILine {
        const removeIndex = this.lines.findIndex(line => line.id === removableLine.id);
        const replacingLine = removeIndex > 0 ? this.lines[removeIndex - 1] : this.lines[0];

        if (removeIndex > 0) {
            this.lines.splice(removeIndex, 1);
            replacingLine.content += value;
        }

        return replacingLine;
    }

    toJsonObject(): SectionJson {
        return {
            id: this.id,
            label: this.label,
            lines: this.lines.map(line => line.toJsonObject())
        };
    }
}
