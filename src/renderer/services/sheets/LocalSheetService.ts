import { faFolder } from '@fortawesome/pro-light-svg-icons';
import { remote } from 'electron';
import fs from 'fs';
import { observable, action } from 'mobx';
import * as uuid from 'uuid';

import { ISheetService } from './ISheetService';
import { Sheet } from '../../model/Sheet';

const dataPath = remote.app.getPath('userData') + '/davo-files';

export class LocalSheetService implements ISheetService {
    public name = 'Local Files';

    public icon = faFolder;

    @observable
    public sheets: Sheet[] = [];

    constructor() {
        this.loadSheets();
    }

    @action
    private async loadSheets() {
        this.sheets = await this.getSheets();
    }

    async getSheets(): Promise<Sheet[]> {
        const files = await this.getFilesFromDirectory();

        const sheets = files.map(file => {
            fs.readFile(dataPath + '/' + file, error => {
                if (error) {
                    console.info('Davo file could not be read');
                    return;
                }
            });

            return new Sheet('All I Want For Christmas', 'Maria Carey');
        });

        return Promise.resolve(sheets);
    }

    async getFilesFromDirectory(): Promise<string[]> {
        return new Promise<string[]>(resolve => {
            fs.readdir(dataPath, (error, dirFiles) => {
                if (error) {
                    console.info('Davo folder not initialized yet!');
                    return;
                }

                const files = dirFiles.filter(file => file.endsWith('.davo'));

                return resolve(files);
            });
        });
    }

    async createSheet(): Promise<Sheet> {
        const creatingSheet = new Promise<Sheet>(resolve => {
            const filePath = dataPath + '/' + uuid.v4() + '.davo';

            fs.writeFile(filePath, '{}', error => {
                if (error) {
                    console.info('Writing Davo file failed!');
                    return;
                }
            });

            resolve(new Sheet('Untitled', ''));
        });

        return creatingSheet.then(sheet => {
            this.addSheet(sheet);

            return sheet;
        });
    }

    @action.bound
    private addSheet(sheet: Sheet) {
        this.sheets.push(sheet);
    }
}
