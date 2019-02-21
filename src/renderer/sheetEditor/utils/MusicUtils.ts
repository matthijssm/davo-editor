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

    export function qualityToString(quality: Quality, nashville: boolean = false) {
        switch (quality) {
            case Quality.Augmented:
                return nashville ? "+" : "aug";
            case Quality.Dimished:
                return nashville ? "o" : "dim";
            case Quality.Minor:
                return nashville ? "-" : "m";
            case Quality.Major:
                return "";
        }
    }
}
