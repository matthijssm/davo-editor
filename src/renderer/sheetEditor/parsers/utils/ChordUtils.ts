import { ChordBase } from "../../../model/ChordBase";
import { Key } from "../../../model/Key";
import { Modifier } from "../../../model/IMusic";

export namespace ChordUtil {
    export function parse(chordString: string, baseKey: Key): ChordBase | null {
        const chordRegex = /([A-G]|[a-g])(#|b)?([^/\s]*)(\/([A-G])(#|b)?)?/i;

        const parts = chordRegex.exec(chordString);

        if (parts) {
            const [, base, modifier, suffix, , bassBase, bassModifier] = parts;

            // Translate chord base and modifier to a nashville base and modifier.
        }

        return null;
    }

    export function parseModifier(modifierString: string): Modifier {
        switch (modifierString) {
            case "b":
                return Modifier.Flat;
            case "#":
                return Modifier.Sharp;
            default:
                return Modifier.None;
        }
    }
}
