import * as uuid from 'uuid';
import { validate } from 'jsonschema';
import { IDocument } from './IDocument';
import { observable } from 'mobx';
import { ISheetJson, sheetJsonSchema } from './ISheetJson';
import { Key, Note, Mode, Modifier } from './Key';

export class Sheet implements IDocument {
    public ID: string;
    @observable public title: string;
    @observable public subtitle: string;

    @observable public key: Key = new Key();
    @observable public capo: number = 0;

    @observable public sections: [];

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
        };
    }

    toJson(): string {
        return JSON.stringify(this.generateJsonObject());
    }

    static fromJson(json: string): Sheet {
        if (validate(json, sheetJsonSchema)) {
            const dataFromJson: ISheetJson = JSON.parse(json);

            const sheet = new Sheet(
                dataFromJson.id,
                dataFromJson.title,
                dataFromJson.subtitle
            );

            sheet.key = new Key(
                (<any>Note)[dataFromJson.key.note],
                (<any>Modifier)[dataFromJson.key.modifier],
                (<any>Mode)[dataFromJson.key.mode]
            );

            sheet.capo = dataFromJson.capo;

            return sheet;
        } else {
            throw new Error(
                "Sheet could not be opened because the schema doesn't match."
            );
        }
    }
}
