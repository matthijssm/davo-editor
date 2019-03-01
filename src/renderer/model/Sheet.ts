import * as uuid from "uuid";
import { IDocument } from "./IDocument";
import { observable, computed } from "mobx";
import { ISheetJson } from "./ISheetJson";
import { Key } from "./Key";
import { ISection } from "./ISection";
import { IElement } from "./IElement";

export class Sheet implements IDocument {
    ID: string;
    @observable title: string;
    @observable subtitle: string;
    @observable artist: string;

    @observable key: Key = new Key();
    @observable capo: number = 0;
    @observable tempo: number = 0;

    @observable sections: ISection[] = observable.array([], { deep: true });

    @computed
    get elements(): IElement[] {
        const collection: IElement[] = [];

        this.sections.forEach(section => {
            collection.push(section);
            collection.push(...section.elements);
        });

        return collection;
    }

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
            artist: this.artist,
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
