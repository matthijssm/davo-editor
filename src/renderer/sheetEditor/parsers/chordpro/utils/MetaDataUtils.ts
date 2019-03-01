import { Directive, DirectiveType } from "./DirectiveUtils";
import { IMetaData } from "../ISheetMetaData";
import { KeyUtils } from "../../utils/KeyUtils";

export namespace MetaDataUtils {
    export function generateSheetMetaData(directives: Directive[]): IMetaData {
        const metaData = createEmptyMetaData();

        directives.forEach(directive => {
            if (directive.type === DirectiveType.UNKNOWN) {
                return;
            }

            switch (directive.type) {
                case DirectiveType.TITLE:
                    return (metaData.title = directive.value);
                case DirectiveType.SUBTITLE:
                    return (metaData.subtitle = directive.value);
                case DirectiveType.ARTIST:
                    return (metaData.artist = directive.value);
                case DirectiveType.COMPOSER:
                    return (metaData.composer = directive.value);
                case DirectiveType.LYRICIST:
                    return (metaData.lyricist = directive.value);
                case DirectiveType.COPYRIGHT:
                    return (metaData.copyright = directive.value);
                case DirectiveType.ALBUM:
                    return (metaData.album = directive.value);
                case DirectiveType.YEAR:
                    return (metaData.year = directive.value);
                case DirectiveType.KEY:
                    return (metaData.key = KeyUtils.fromString(directive.value));
                case DirectiveType.TIME:
                    return (metaData.time = directive.value);
                case DirectiveType.TEMPO:
                    return (metaData.tempo = directive.value ? parseInt(directive.value, 10) : null);
                case DirectiveType.DURATION:
                    return (metaData.duration = directive.value);
                case DirectiveType.CAPO:
                    return (metaData.capo = directive.value ? parseInt(directive.value, 10) : null);
                case DirectiveType.META:
                    return (metaData.meta = directive.value);
            }
        });

        return metaData;
    }

    function createEmptyMetaData(): IMetaData {
        return {
            title: "",
            subtitle: "",
            artist: "",
            composer: "",
            lyricist: "",
            copyright: "",
            album: "",
            year: "",
            key: null,
            time: "",
            tempo: NaN,
            duration: "",
            capo: NaN,
            meta: ""
        };
    }
}
