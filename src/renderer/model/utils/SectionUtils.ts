import { ISection } from "../ISection";

export namespace SectionUtils {
    export function copyLines(from: ISection, to: ISection): ISection {
        to.lines.push(...from.lines);

        return to;
    }
}
