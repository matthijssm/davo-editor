import { IElement } from "../../model/IElement";
import { Key } from "../../model/Key";

interface IParser {
    parse(text: string): IElement[];
}

export namespace TextParser {
    export function parse(text: string, key: Key): IElement[] {
        return [];
    }

    function getParser(text: string): IParser | null {
        // Check if chopro chords are in text and return chopro parsers

        // Or pass sheet parsers
        return null;
    }
}
