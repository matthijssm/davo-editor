import { DIRECTIVE_REGEX, DirectiveUtil } from "./DirectiveUtils";
import { Chord } from "../../../../../model/Chord";
import { Key } from "../../../../../model/Key";
import { ILine } from "../../../../../model/ILine";
import { Line } from "../../../../../model/Line";
import { IChord } from "../../../../../model/IChord";
import { AlphabetToChordBaseTranslator } from "../../../../chords/AlphabetToChordBaseTranslator";

export const SECTION_DATA_REGEX = /.*:$/gm;
export const CHORD_REGEX_GLOBAL = /\[[A-G,a-g][#,b]?[a-z,1-9]{0,4}\/?[A-G,a-g]?[#,b]?\]/g;
export const CHORD_REGEX = /\[[A-G,a-g][#,b]?[a-z,1-9]{0,4}\/?[A-G,a-g]?[#,b]?\]/;

export namespace LineUtils {
    export function containsSectionData(line: string): boolean {
        return !!DirectiveUtil.getSectionDirective(line) || !!line.match(SECTION_DATA_REGEX);
    }

    export function containsDirective(line: string): boolean {
        return !!line.match(DIRECTIVE_REGEX);
    }

    export function parseLine(text: string, key: Key): ILine {
        const lineContent = text.replace(CHORD_REGEX_GLOBAL, "");

        const line = new Line(null, lineContent);

        line.chords = parseChordsFromLine(text, key);

        return line;
    }

    export function parseChordsFromLine(
        lineContent: string,
        key: Key,
        startPosition: number = 0,
        startOrder: number = 0
    ): IChord[] {
        const chords: IChord[] = [];

        // Check if there are any chords in this line
        const chordsInLine = CHORD_REGEX.exec(lineContent);

        if (chordsInLine) {
            const chordBase = AlphabetToChordBaseTranslator.translate(removeBrackets(chordsInLine[0]), key);

            const chordPosition = startPosition + chordsInLine.index;

            let chordOrder = startOrder;

            if (chordPosition === startPosition) {
                chordOrder++;
            } else {
                chordOrder = 0;
            }

            const chordModel = new Chord(chordBase, chordPosition, 0);

            if (chordModel) {
                chords.push(chordModel);
            }

            // Remove chord from line content.
            const newLineContent = lineContent.slice(chordsInLine.index + chordsInLine[0].length);

            chords.push(...parseChordsFromLine(newLineContent, key, chordPosition, chordOrder));
        }

        return chords;
    }

    function removeBrackets(chord: string): string {
        return chord.replace(/\[{0,}\]{0,}/g, "");
    }
}
