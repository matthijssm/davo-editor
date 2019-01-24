import uuid from "uuid";

import { ISection } from "./ISection";
import { observable } from "mobx";

export type SectionJson = {
    id: string;
    label: string;
    lines: [];
};

export class Section implements ISection {
    id: string;
    @observable label: string = "";
    lines: [] = [];

    constructor(id?: string) {
        this.id = id ? id : uuid.v4();
    }

    toJsonObject(): SectionJson {
        return {
            id: this.id,
            label: this.label,
            lines: this.lines
        };
    }
}
