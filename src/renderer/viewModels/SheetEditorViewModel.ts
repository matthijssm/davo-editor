import { ITabbedEditor } from '../controls/ITabbedEditor';
import { Sheet } from '../model/Sheet';
import { IDocument } from '../model/IDocument';

export class SheetEditorViewModel implements ITabbedEditor {
    id: string;
    label: string = 'Een liedje';
    isLoading: boolean = false;
    isUnsaved: boolean = false;

    constructor(public document: Sheet) {
        this.label = document.title;
        this.id = document.ID;
    }
}
