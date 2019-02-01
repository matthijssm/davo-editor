import { IDocument } from "../model/IDocument";

export interface ITabbedEditor {
    id: string;
    label: string;
    isLoading: boolean;
    isUnsaved: boolean;
    document: IDocument;

    saveSheet(): void;
}
