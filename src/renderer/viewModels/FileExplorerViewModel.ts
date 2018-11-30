import { ISheetService } from '../services/sheets/ISheetService';
import { computed, observable, action } from 'mobx';

export class FileExplorerViewModel {
    @observable
    private openService: ISheetService | null = null;

    constructor(private register: ISheetService[]) {}

    get services() {
        return this.register;
    }

    isActive(service: ISheetService) {
        return service === this.openService;
    }

    @action
    toggleActive(service: ISheetService) {
        if (this.isActive(service)) {
            this.openService = null;
        } else {
            this.openService = service;
        }
    }

    createFile() {
        if (this.openService) {
            this.openService.createSheet();
        }
    }
}
