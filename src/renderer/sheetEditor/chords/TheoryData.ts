import { Quality } from "../../model/IMusic";

export type NashvilleTheory = {
    defaultQuality: Quality;
    degree: number;
};

export type NashvilleTheoryMap = Map<number, NashvilleTheory>;

export namespace TheoryData {
    export const KEY_LIST = ["A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab"];

    export const THEORETICAL_KEYS = new Map<string, string>([["B#", "C"], ["Fb", "E"], ["Cb", "B"], ["E#", "F"]]);

    export const MAJOR_INDEX_MAP = new Map<number, number>([[1, 0], [2, 2], [3, 4], [4, 5], [5, 7], [6, 9], [7, 11]]);
    export const MINOR_INDEX_MAP = new Map<number, number>([[1, 0], [2, 1], [3, 3], [4, 5], [5, 6], [6, 8], [7, 10]]);

    export const MAJOR_NASHVILLE: NashvilleTheoryMap = new Map([
        [0, { defaultQuality: Quality.Major, degree: 1 }],
        [2, { defaultQuality: Quality.Minor, degree: 2 }],
        [4, { defaultQuality: Quality.Minor, degree: 3 }],
        [5, { defaultQuality: Quality.Major, degree: 4 }],
        [7, { defaultQuality: Quality.Major, degree: 5 }],
        [9, { defaultQuality: Quality.Minor, degree: 6 }],
        [11, { defaultQuality: Quality.Dimished, degree: 7 }]
    ]);

    export const MINOR_NASHVILLE: NashvilleTheoryMap = new Map([
        [0, { defaultQuality: Quality.Minor, degree: 1 }],
        [1, { defaultQuality: Quality.Dimished, degree: 2 }],
        [3, { defaultQuality: Quality.Major, degree: 3 }],
        [5, { defaultQuality: Quality.Minor, degree: 4 }],
        [6, { defaultQuality: Quality.Minor, degree: 5 }],
        [8, { defaultQuality: Quality.Major, degree: 6 }],
        [10, { defaultQuality: Quality.Dimished, degree: 7 }]
    ]);
}
