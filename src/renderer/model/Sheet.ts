import * as uuid from "uuid";
import { validate } from "jsonschema";
import { IDocument } from "./IDocument";
import { observable } from "mobx";
import { ISheetJson, sheetJsonSchema } from "./ISheetJson";
import { Key, Note, Mode, Modifier } from "./Key";
import { Section } from "./Section";

export class Sheet implements IDocument {
    ID: string;
    @observable title: string;
    @observable subtitle: string;

    @observable key: Key = new Key();
    @observable capo: number = 0;
    @observable tempo: number = 0;

    @observable sections: Section[] = observable.array([], { deep: true });

    constructor(id: string = null, title: string, subtitle: string) {
        this.ID = id === null ? uuid.v4() : id;
        this.title = title;
        this.subtitle = subtitle;
    }

    private generateJsonObject(): ISheetJson {
        return {
            id: this.ID,
            title: this.title,
            subtitle: this.subtitle,
            key: this.key.toJsonObject(),
            capo: this.capo,
            tempo: this.tempo,
            sections: this.sections.map(section => section.toJsonObject())
        };
    }

    toJson(): string {
        return JSON.stringify(this.generateJsonObject());
    }
}
