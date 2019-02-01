import { observable } from "mobx";
import uuid from "uuid";

import { ILine, LineType, LineJson } from "../sheetEditor/components/sheet/ILine";
import { IElement } from "./IElement";

export class Line implements ILine {
    id: string;
    @observable content: string;
    @observable type: LineType = LineType.Lyric;

    get elements(): IElement[] {
        return [];
    }

    constructor(id?: string, content?: string) {
        this.id = id ? id : uuid.v4();
        this.content = content ? content : "";
    }

    toJsonObject(): LineJson {
        return {
            id: this.id,
            content: this.content,
            type: LineType[this.type]
        };
    }
}
