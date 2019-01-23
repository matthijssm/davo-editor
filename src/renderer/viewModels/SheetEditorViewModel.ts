import { ITabbedEditor } from '../controls/ITabbedEditor';
import { Sheet } from '../model/Sheet';
import { IDocument } from '../model/IDocument';
import {
    observable,
    IReactionDisposer,
    reaction,
    computed,
    action,
} from 'mobx';
import { ISheetService } from '../services/sheets/ISheetService';
import { isEmpty } from 'lodash';
import { Key } from '../model/Key';

export type PropertiesPaneTabs = 'Sheet' | 'Meta';

export class SheetEditorViewModel implements ITabbedEditor {
    isLoading: boolean = false;

    @observable
    isUnsaved: boolean = false;

    @observable
    document: Sheet;

    @observable
    openPropertiesPane: PropertiesPaneTabs = 'Meta';

    private documentObserverDisposer: IReactionDisposer;

    constructor(document: Sheet, private service: ISheetService) {
        this.document = document;

        this.documentObserverDisposer = reaction(
            () => {
                return {
                    title: this.document.title,
                    subtitle: this.document.subtitle,
                    sections: this.document.sections,
                };
            },
            document => {
                this.isUnsaved = true;
            }
        );
    }

    get id(): string {
        return this.document.ID;
    }

    @computed
    get label(): string {
        return this.document.title;
    }

    @action
    updateTitle(value: string) {
        this.document.title = value;
    }

    @action
    updateSubtitle(value: string) {
        this.document.subtitle = value;
    }

    @action
    updateKey(key: Key) {
        this.document.key = key;
    }

    @action
    updateCapo(capo: number) {
        this.document.capo = capo;
        console.log(capo);
    }

    @action
    saveSheet() {
        if (isEmpty(this.document.title)) {
            this.document.title = 'Untitled';
        }

        this.service.saveSheet(this.document);
        this.isUnsaved = false;
    }
}
