import { Key } from "../../../model/Key";
import { ISection } from "../../../model/ISection";
import { Section } from "../../../model/Section";
import { ILine } from "../../../model/ILine";
import { IChord } from "../../../model/IChord";
import { Line } from "../../../model/Line";
import { AlphabetToChordBaseTranslator } from "../../chords/AlphabetToChordBaseTranslator";
import { Chord } from "../../../model/Chord";
import { last } from "lodash";

const WHITE_SPACE = /\s/;
const CHORD_LINE_REGEX = /^\s*((([A-G])(#|b)?([^/\s]*)(\/([A-G])(#|b)?)?)(\s|$)+)+(\s|$)+/;

export namespace SheetParser {
    export function parseDocument(text: string, key?: Key) {
        if (!key) {
            throw new Error("No key specified.");
        }
        return parsePartial(text, key);
    }

    export function parsePartial(text: string, key: Key): ISection[] {
        console.log(text);
        const sections = text.split(/$[\r\n|\n|\r]{2}^/gm);

        console.log(sections);

        return sections.map(section => parseSection(section, key));
    }

    function parseSection(text: string, key: Key): ISection {
        const section = new Section(null, false);

        const lines = text.split(/[\r\n|\n|\r]{1}/g);

        const lineCollection: ILine[] = [];

        lines.forEach((line, index) => parseLine(line, getNextLine(lines, index), lineCollection, key));

        section.lines = lineCollection;

        return section;
    }

    function getNextLine(lines: string[], index: number): string | null {
        return lines[index + 1] !== undefined ? lines[index + 1] : null;
    }

    function parseLine(text: string, nextText: string | null, lineCollection: ILine[], key: Key): ILine {
        const line = new Line();

        if (text.match(CHORD_LINE_REGEX)) {
            const chordLine = text;
            line.chords = getChordsOnLine(chordLine, key);

            if (nextText !== null && !nextText.match(CHORD_LINE_REGEX)) {
                line.content = nextText;
            }

            lineCollection.push(line);
        } else {
            if ((last(lineCollection) && last(lineCollection).content !== text) || lineCollection.length === 0) {
                line.content = text;
                lineCollection.push(line);
            }
        }
        return line;
    }

    function getChordsOnLine(text: string, key: Key): IChord[] {
        const chords: IChord[] = [];
        let chordString = "";

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];

            if (!char.match(WHITE_SPACE)) {
                chordString += char;
            }

            if ((nextChar && nextChar.match(WHITE_SPACE)) || !nextChar) {
                if (chordString) {
                    const chordBase = AlphabetToChordBaseTranslator.translate(chordString, key);
                    const newChord = new Chord(chordBase, i - chordString.length + 1);

                    chords.push(newChord);
                    chordString = "";
                }
            }
        }

        return chords;
    }
}
