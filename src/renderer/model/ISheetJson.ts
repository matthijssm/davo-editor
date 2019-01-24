import { IKeyJson } from "./Key";
import { SectionJson } from "./Section";

export interface ISheetJson {
    id: string;
    title: string;
    subtitle: string;
    key: IKeyJson;
    capo: number;
    tempo: number;

    sections: SectionJson[];
}

export const sheetJsonSchema = {
    id: "string",
    title: "string",
    subtitle: "string",
    key: {
        note: "string",
        modifier: "string",
        mode: "string"
    },
    capo: "number",
    tempo: "number",
    sections: {
        type: "array",
        items: {
            id: "string",
            label: "string",
            lines: "array"
        }
    }
};
