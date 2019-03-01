import { Key } from "../../../model/Key";

export interface IMetaData {
    title: string | null;
    subtitle: string | null;
    artist: string | null;
    composer: string | null;
    lyricist: string | null;
    copyright: string | null;
    album: string | null;
    year: string | null;
    key: Key | null;
    time: string | null;
    tempo: number | null;
    duration: string | null;
    capo: number | null;
    meta: string | null;
}
