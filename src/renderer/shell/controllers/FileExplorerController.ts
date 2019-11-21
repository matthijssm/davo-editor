import { ISheetService } from "../../services/sheets/ISheetService";
import { FileExplorerViewModel } from "../../shell/viewModels/FileExplorerViewModel";
import { LocalSheetService } from "../../services/sheets/LocalSheetService";

export class FileExplorerController {
    private register: ISheetService[] = [];
    viewModel: FileExplorerViewModel;

    constructor() {
        this.registerService();
        this.viewModel = new FileExplorerViewModel(this.register);
    }

    private registerService(): void {
        this.register.push(new LocalSheetService());
    }
}
