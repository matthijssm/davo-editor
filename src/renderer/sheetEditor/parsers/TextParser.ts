import { IElement } from "../../model/IElement";
import { Key } from "../../model/Key";
import { ISection } from "../../model/ISection";
import { SheetParser } from "./sheet/SheetParser";
import { ChordProParser } from "./chordpro/ChordProParser";

interface IParser {
    parse(text: string): IElement[];
}

const CHORD_LINE_REGEX = /^\s*((([A-G])(#|b)?([^/\s]*)(\/([A-G])(#|b)?)?)(\s|$)+)+(\s|$)+/m;

export namespace TextParser {
    export function parsePartial(text: string, key: Key): ISection[] {
        if (text.match(CHORD_LINE_REGEX)) {
            console.info("[PARSER] Using sheet parser");
            return SheetParser.parsePartial(text, key);
        }

        console.info("[PARSER] Using ChordPro parser");
        return ChordProParser.parsePartial(text, key);
    }

    export function parseDocument(text: string, key?: Key) {
        if (text.match(CHORD_LINE_REGEX)) {
            return SheetParser.parseDocument(text, key);
        }

        return ChordProParser.parseDocument(text, key);
    }
}
