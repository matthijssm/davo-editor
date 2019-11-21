import { ITabbedEditor } from "../../controls/ITabbedEditor";
import { Sheet } from "../../model/Sheet";
import { observable, IReactionDisposer, reaction, computed, action } from "mobx";
import { ISheetService } from "../../services/sheets/ISheetService";
import { isEmpty } from "lodash";
import { Key } from "../../model/Key";
import { Section } from "../../model/Section";
import { IElement } from "../../model/IElement";
import { TextParser } from "../parsers/TextParser";
import { ISection } from "../../model/ISection";
import { Line } from "../../model/Line";
import { Chord } from "../../model/Chord";
import { SectionUtils } from "../../model/utils/SectionUtils";
import console = require("console");

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

    onComplexPaste(textData: string) {
        const parsedSections = TextParser.parsePartial(textData, this.key);

        if (parsedSections.length > 0) {
            const currentSection = this.getCurrentSection();

            SectionUtils.copyLines(parsedSections.shift(), currentSection);

            if (parsedSections.length > 0) {
                this.document.addSections(parsedSections, currentSection);
            }
        }

        console.log(parsedSections);
    }

    getCurrentSection(): ISection | null {
        if (this.document.sections.length === 0) {
            return null;
        }

        if (this.selectedElement instanceof Line) {
            return this.document.sections.find(section => section.lines.some(line => line.id === this.selectedElement.id));
        }

        if (this.selectedElement instanceof Chord) {
            return this.document.sections.find(section => section.lines.some(line => line.chords.some(chord => chord.id === this.selectedElement.id)));
        }

        return [...this.document.sections].pop();
    }

    dispose(): void {
        this.documentObserverDisposer();
    }
}
