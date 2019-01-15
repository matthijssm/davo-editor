import { ISheetService } from '../services/sheets/ISheetService';
import { computed, observable, action } from 'mobx';
import { Sheet } from '../model/Sheet';
export class FileExplorerViewModel {
    @observable
    public openService: ISheetService | null = null;

    constructor(private register: ISheetService[]) {}

    get services() {
        return this.register;
    }

    isActive(service: ISheetService) {
        return service === this.openService;
    }

    @action
    toggleActiveService(service: ISheetService) {
        if (this.isActive(service)) {
            this.openService = null;
        } else {
            this.openService = service;
        }
    }

    createFile(): Promise<Sheet> | null {
        if (this.openService) {
            return this.openService.createSheet();
        }
        return null;
    }

    importFile() {
        if (!this.openService) {
        }
        // Create a new sheet
        // Open the new sheet
        // Open the file import dialog
    }
}
