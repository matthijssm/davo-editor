import { remote, BrowserWindow } from "electron";
import { observable, action } from "mobx";
import { FileExplorerController } from "../controllers/FileExplorerController";
import { IDocument } from "../model/IDocument";
import { ITabbedEditor } from "../controls/ITabbedEditor";
import { Sheet } from "../model/Sheet";
import { SheetEditorViewModel } from "../viewModels/SheetEditorViewModel";
import { IpcController } from "../controllers/IpcController";

export class EditorState {
    @observable
    browserWindow: BrowserWindow = remote.getCurrentWindow();

    @observable
    openEditors: ITabbedEditor[] = [];

    @observable
    activeEditor: ITabbedEditor | null = null;

    @action
    openEditor(document: IDocument) {
        const exisitingTab = this.openEditors.find(editor => editor.id === document.ID);

        if (exisitingTab) {
            this.activeEditor = exisitingTab;
        } else {
            if (document instanceof Sheet) {
                const viewModel = new SheetEditorViewModel(document, this.fileExplorerController.viewModel.openService);
                this.openEditors.push(viewModel);
                this.activeEditor = viewModel;
            }
        }
    }

    @action
    closeEditor(editor: ITabbedEditor) {
        this.openEditors = this.openEditors.filter(openEditor => openEditor.id !== editor.id);

        if (this.activeEditor.id === editor.id) {
            if (this.openEditors.length > 0) {
                this.openEditor(this.openEditors[0].document);
            } else {
                this.activeEditor = null;
            }
        }
    }

    fileExplorerController = new FileExplorerController();

    ipcController = new IpcController(this);
}
