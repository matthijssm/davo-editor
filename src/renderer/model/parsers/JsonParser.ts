import { validate } from "jsonschema";

import { Sheet } from "../Sheet";
import { sheetJsonSchema, ISheetJson } from "../ISheetJson";
import { Key, Note, Modifier, Mode } from "../Key";
import { SectionJson, Section } from "../Section";

export namespace JsonParser {
    export function sheet(json: string): Sheet {
        if (validate(json, sheetJsonSchema)) {
            const dataFromJson: ISheetJson = JSON.parse(json);

            const newSheet = new Sheet(dataFromJson.id, dataFromJson.title, dataFromJson.subtitle);

            newSheet.key = new Key(
                (Note as any)[dataFromJson.key.note],
                (Modifier as any)[dataFromJson.key.modifier],
                (Mode as any)[dataFromJson.key.mode]
            );

            newSheet.capo = dataFromJson.capo;
            newSheet.tempo = dataFromJson.tempo;

            newSheet.sections = sections(dataFromJson.sections);

            return newSheet;
        } else {
            throw new Error("Sheet could not be opened because the schema doesn't match.");
        }
    }

    function sections(parsedJson: SectionJson[]): Section[] {
        return parsedJson.map(sectionJson => {
            const newSection = new Section(sectionJson.id);

            newSection.label = sectionJson.label;
            newSection.lines = sectionJson.lines;

            return newSection;
        });
    }
}
