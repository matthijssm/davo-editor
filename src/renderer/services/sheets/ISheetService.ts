import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { Sheet } from '../../model/Sheet';

export interface ISheetService {
    icon: IconDefinition;
    name: string;

    sheets: Sheet[];

    createSheet(): Promise<Sheet>;

    saveSheet(sheet: Sheet): Promise<Sheet>;
}
