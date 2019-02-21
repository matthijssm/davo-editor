import { validate } from "jsonschema";

import { Sheet } from "../Sheet";
import { sheetJsonSchema, ISheetJson } from "../ISheetJson";
import { Key } from "../Key";
import { SectionJson, Section } from "../Section";
import { Line } from "../Line";
import { LineJson, ILine, LineType } from "../ILine";
import { ISection } from "../ISection";
import { Note, Modifier, Mode, Quality } from "../IMusic";
import { ChordJson, IChord } from "../IChord";
import { ChordBase } from "../ChordBase";
import { Chord } from "../Chord";

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

    function sections(parsedJson: SectionJson[]): ISection[] {
        return parsedJson.map(sectionJson => {
            const newSection = new Section(sectionJson.id);

            newSection.label = sectionJson.label;
            newSection.lines = lines(sectionJson.lines);

            return newSection;
        });
    }

    function lines(parsedJson: LineJson[]): ILine[] {
        return parsedJson.map(lineJson => {
            const newLine = new Line(lineJson.id);

            newLine.type = (LineType as any)[lineJson.type];
            newLine.content = lineJson.content;
            newLine.chords = chords(lineJson.chords);

            return newLine;
        });
    }

    function chords(parsedJson: ChordJson[]): IChord[] {
        return parsedJson.map(chordJson => {
            const chordBase = new ChordBase(
                chordJson.base,
                (Modifier as any)[chordJson.modifier],
                (Quality as any)[chordJson.quality],
                chordJson.adjectives,
                chordJson.inversionBase,
                (Modifier as any)[chordJson.inversionModifier]
            );

            return new Chord(chordBase, chordJson.position, chordJson.order, chordJson.id);
        });
    }
}
