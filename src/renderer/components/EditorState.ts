import { remote, BrowserWindow } from 'electron';
import { observable } from 'mobx';
import { FileExplorerController } from '../controllers/FileExplorerController';

export class EditorState {
    @observable
    public browserWindow: BrowserWindow = remote.getCurrentWindow();

    public fileExplorerController = new FileExplorerController();
}
