import { EditorState } from "shell";
import { ipcRenderer, remote } from "electron";

export class IpcController {
    constructor(private editorState: EditorState) {
        this.registerIpcListeners();
    }

    registerIpcListeners(): any {
        ipcRenderer.on("save", () => {
            if (this.editorState.activeEditor) {
                this.editorState.activeEditor.saveSheet();
            }
        });

        ipcRenderer.on("reload", () => {
            remote.getCurrentWindow().reload();
        });

        ipcRenderer.on("close", () => {
            if (this.editorState.activeEditor) {
                this.editorState.closeEditor(this.editorState.activeEditor);
            } else {
                remote.getCurrentWindow().close();
            }
        });
    }
}
