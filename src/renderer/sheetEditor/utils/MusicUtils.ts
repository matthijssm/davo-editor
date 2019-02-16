import { Modifier, Note, Mode, Quality } from "../../model/IMusic";

export namespace MusicUtils {
    export function modifierToString(modifier: Modifier) {
        if (modifier === Modifier.Flat) {
            return "b";
        }

        if (modifier === Modifier.Sharp) {
            return "#";
        }

        return "";
    }

    export function noteToString(note: Note) {
        return Note[note];
    }

    export function modeToString(mode: Mode) {
        if (mode === Mode.Minor) return "m";
        return "";
    }

    export function qualityToString(quality: Quality) {
        switch (quality) {
            case Quality.Augmented:
                return "aug";
            case Quality.Dimished:
                return "dim";
            case Quality.Minor:
                return "m";
            case Quality.Major:
                return "";
        }
    }
}
