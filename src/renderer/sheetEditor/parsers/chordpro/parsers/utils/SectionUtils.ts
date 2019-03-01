import { Directive, DirectiveType, DirectiveUtil } from "./DirectiveUtils";
import { LineUtils } from "./LineUtils";
import { Key } from "../../../../../model/Key";
import { ISection } from "../../../../../model/ISection";
import { Section } from "../../../../../model/Section";

export namespace SectionUtils {
    export function getSections(document: string, key: Key): ISection[] {
        const sections = document.split(/[\r\n]{2,}/gm);

        const sectionCollection: ISection[] = [];

        sections.forEach(section => parseSection(section, sectionCollection, key));

        return sectionCollection;
    }

    function parseSection(text: string, collection: ISection[], key: Key): void {
        const section = new Section(null, false);

        const lines = text.split(/[\r\n]{1}/g);

        if (lines.length) {
            fillSectionWithLines(lines, section, key);

            if (section.lines.length > 0) {
                collection.push(section);
            }
        }
    }

    function fillSectionWithLines(lines: string[], section: ISection, key: Key): void {
        lines.forEach((line, index) => {
            // Check if the first line of the section is a directive we need to parse
            if (index === 0 && LineUtils.containsSectionData(line)) {
                return setSectionLabel(line, section);
            }

            // TODO: Parse comment as directive or with a sharp sign.
            if (LineUtils.containsDirective(line)) {
                return;
            }

            const newLine = LineUtils.parseLine(line, key);

            if (newLine.content.length > 0 || newLine.chords.length > 0) {
                // console.log("This is the line i'm pushing: ", line);
                section.lines.push(newLine);
            }
        });
    }

    function setSectionLabel(line: string, section: Section) {
        const sectionDirective = DirectiveUtil.getSectionDirective(line);

        if (sectionDirective) {
            setLabelFromDirective(sectionDirective, section);
        } else {
            section.label = line.replace(":", "").trim();
        }
    }

    function setLabelFromDirective(directive: Directive, section: Section) {
        switch (directive.type) {
            case DirectiveType.START_OF_CHORUS:
                return (section.label = directive.value ? directive.value.trim() : "Chorus");
            case DirectiveType.START_OF_VERSE:
                return (section.label = directive.value ? directive.value.trim() : "");
        }
    }
}
