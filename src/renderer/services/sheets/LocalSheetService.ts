import { ISheetService } from './ISheetService';
import { IconDefinition, faFolder } from '@fortawesome/pro-light-svg-icons';
import { Sheet } from '../../model/Sheet';
import { remote } from 'electron';
import fs from 'fs';
import { string } from 'prop-types';
import { resolve } from 'dns';
import { observable, action, runInAction } from 'mobx';
import * as uuid from 'uuid';
import { IDocument } from '../../model/IDocument';

const dataPath = remote.app.getPath('userData') + '/davo-files';

export class LocalSheetService implements ISheetService {
    public name = 'Local Files';

    public icon = faFolder;

    @observable
    public sheets: IDocument[] = [];

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
            fs.readFile(dataPath + '/' + file, (error, data) => {
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
