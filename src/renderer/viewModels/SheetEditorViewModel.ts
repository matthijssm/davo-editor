import { ITabbedEditor } from "../controls/ITabbedEditor";
import { Sheet } from "../model/Sheet";
import { observable, IReactionDisposer, reaction, computed, action } from "mobx";
import { ISheetService } from "../services/sheets/ISheetService";
import { isEmpty } from "lodash";
import { Key } from "../model/Key";
import { Section } from "../model/Section";
import { IElement } from "../model/IElement";

export type PropertiesPaneTabs = "Sheet" | "Meta";

export class SheetEditorViewModel implements ITabbedEditor {
    isLoading: boolean = false;

    @observable
    isUnsaved: boolean = false;

    @observable
    document: Sheet;

    @observable
    openPropertiesPane: PropertiesPaneTabs = "Sheet";

    @observable selectedElement: IElement | null = null;

    @observable caretPosition: number = 0;

    private documentObserverDisposer: IReactionDisposer;

    constructor(document: Sheet, private service: ISheetService) {
        this.document = document;

        this.documentObserverDisposer = reaction(
            () => {
                return this.document.toJson();
            },
            changedDocument => {
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

    get key(): Key {
        return this.document.key;
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
    }

    @action
    updateTempo(tempo: number) {
        this.document.tempo = tempo;
    }

    @action
    createSection(): any {
        this.document.sections.push(new Section());
    }

    @action
    deleteSection(id: string): any {
        const index = this.document.sections.findIndex(section => section.id === id);

        this.document.sections.splice(index, 1);
    }

    @action
    saveSheet() {
        if (isEmpty(this.document.title)) {
            this.document.title = "Untitled";
        }

        this.service.saveSheet(this.document);
        this.isUnsaved = false;
    }

    @action
    setSelectedElement(element: IElement | null): void {
        this.selectedElement = element;
    }

    @action
    setCaretPosition(position: number): void {
        this.caretPosition = position;
    }

    dispose(): void {
        this.documentObserverDisposer();
    }
}
