import * as uuid from 'uuid';
import { IDocument } from './IDocument';

export class Sheet implements IDocument {
    public ID: string;
    constructor(public title: string, public subtitle: string) {
        this.ID = uuid.v4();
    }
}
