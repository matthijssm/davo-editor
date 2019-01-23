import { IKeyJson } from './Key';

export interface ISheetJson {
    id: string;
    title: string;
    subtitle: string;
    key: IKeyJson;
    capo: number;
}

export const sheetJsonSchema = {
    id: 'string',
    title: 'string',
    subtitle: 'string',
    key: {
        note: 'string',
        modifier: 'string',
        mode: 'string',
    },
    capo: 'number',
};
