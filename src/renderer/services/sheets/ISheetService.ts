import { Sheet } from '../../model/Sheet';
import { IconDefinition } from '@fortawesome/pro-light-svg-icons';

export interface ISheetService {
    icon: IconDefinition;
    name: string;

    sheets: Sheet[];

    createSheet(): Promise<Sheet>;
}
