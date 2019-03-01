import { IMetaData } from "../model/ISheetMetaData";
import { DirectiveUtil } from "./utils/DirectiveUtils";
import { MetaDataUtils } from "./utils/MetaDataUtils";
import { SectionUtils } from "./utils/SectionUtils";
import { Key } from "../../../../model/Key";
import { IDocument } from "../../../../model/IDocument";
import { Sheet } from "../../../../model/Sheet";
import { ISection } from "../../../../model/ISection";

export namespace ChordProParser {
    export function parseSections(text: string, key: Key): ISection[] {
        return SectionUtils.getSections(text, key);
    }

    export function parseDocument(document: string, key?: Key): IDocument {
        const metaData: IMetaData = parseMetaData(document);

        const sheet = new Sheet(null, metaData.title, metaData.subtitle);

        sheet.artist = metaData.artist;
        sheet.tempo = metaData.tempo;

        if (key || metaData.key) {
            sheet.key = key ? key : metaData.key;
        } else {
            throw new Error("No key is given for this document.");
        }

        sheet.sections.push(...parseSections(document, sheet.key));

        return sheet;
    }

    function parseMetaData(document: string): IMetaData {
        const directives = DirectiveUtil.getSheetDirectives(document);

        const metaData = MetaDataUtils.generateSheetMetaData(directives);

        return metaData;
    }
}
