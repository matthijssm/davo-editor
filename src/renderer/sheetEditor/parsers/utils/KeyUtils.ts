import { Key } from "../../../model/Key";
import { Note, Mode, Modifier } from "../../../model/IMusic";

export namespace KeyUtils {
    const VALID_KEY_REGEX = /^([A-G,a-g]{1})(#|b)?(m)?/;

    export function fromString(text: string): Key | null {
        const keyParts = text.match(VALID_KEY_REGEX);

        if (keyParts) {
            const [, note, modifier, mode] = keyParts;
            return new Key(stringToNote(note), stringToModifier(modifier), stringToMode(mode));
        } else {
            return null;
        }
    }

    function stringToNote(text: string): Note {
        const cleanString = text.toUpperCase();

        return (Note as any)[cleanString];
    }

    function stringToModifier(text: string): Modifier {
        switch (text) {
            case "#":
                return Modifier.Sharp;
            case "b":
                return Modifier.Flat;
            default:
                return Modifier.None;
        }
    }

    function stringToMode(text: string): Mode {
        if (text === "m") {
            return Mode.Minor;
        }

        return Mode.Major;
    }
}
