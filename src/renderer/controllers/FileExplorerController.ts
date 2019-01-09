import { ISheetService } from '../services/sheets/ISheetService';
import { LocalSheetService } from '../services/sheets/LocalSheetService';
import { FileExplorerViewModel } from '../viewModels/FileExplorerViewModel';

export class FileExplorerController {
    private register: ISheetService[] = [];
    public viewModel: FileExplorerViewModel;

    constructor() {
        this.registerService();
        this.viewModel = new FileExplorerViewModel(this.register);
    }

    private registerService(): void {
        this.register.push(new LocalSheetService());
    }
}
