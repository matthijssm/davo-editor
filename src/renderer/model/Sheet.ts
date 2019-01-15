import * as uuid from 'uuid';
import { validate } from 'jsonschema';
import { IDocument } from './IDocument';
import { observable } from 'mobx';
import { ISheetJson, sheetJsonSchema } from './ISheetJson';

export class Sheet implements IDocument {
    public ID: string;
    @observable public title: string;
    @observable public subtitle: string;

    @observable public sections: [];

    constructor(id: string = null, title: string, subtitle: string) {
        this.ID = id === null ? uuid.v4() : id;
        this.title = title;
        this.subtitle = subtitle;
    }

    toJson(): string {
        return JSON.stringify({
            id: this.ID,
            title: this.title,
            subtitle: this.subtitle,
        });
    }

    static fromJson(json: string): Sheet {
        if (validate(json, sheetJsonSchema)) {
            const dataFromJson: ISheetJson = JSON.parse(json);

            return new Sheet(
                dataFromJson.id,
                dataFromJson.title,
                dataFromJson.subtitle
            );
        } else {
            throw new Error(
                "Sheet could not be opened because the schema doesn't match."
            );
        }
    }
}
