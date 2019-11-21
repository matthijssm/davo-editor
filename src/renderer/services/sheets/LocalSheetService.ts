import { action, computed, observable } from "mobx";

import { ISheetService } from "./ISheetService";
import { JsonParser } from "../../model/parsers/JsonParser";
import { Sheet } from "../../model/Sheet";
import { faFolder } from "@fortawesome/pro-light-svg-icons";
import fs from "fs";
import { orderBy } from "lodash";
import { remote } from "electron";

const dataPath = remote.app.getPath("userData") + "/davo-files";

export class LocalSheetService implements ISheetService {
    name = "Local Files";

    icon = faFolder;

    @observable
    private _sheets: Sheet[] = [];

    constructor() {
        this.loadSheets();
    }

    @computed
    get sheets(): Sheet[] {
        return orderBy(this._sheets, ["title", "subtitle"], "asc");
    }

    @action
    private async loadSheets() {
        this._sheets = await this.getSheets();
    }

    async getSheets(): Promise<Sheet[]> {
        const files = await this.getFilesFromDirectory();

        const sheets = files.map(file => {
            const data = fs.readFileSync(`${dataPath}/${file}`, {
                encoding: "utf-8"
            });

            return JsonParser.sheet(data);
        });

        return Promise.resolve(sheets);
    }

    async getFilesFromDirectory(): Promise<string[]> {
        return new Promise<string[]>(resolve => {
            fs.readdir(dataPath, (error, dirFiles) => {
                if (error) {
                    console.info("Davo folder not initialized yet!");
                    return;
                }

                const files = dirFiles.filter(file => file.endsWith(".davo"));

                return resolve(files);
            });
        });
    }

    async createSheet(): Promise<Sheet> {
        const creatingSheet = new Promise<Sheet>(resolve => {
            const newSheet = new Sheet(null, "Untitled Sheet", "");

            const filePath = `${dataPath}/${newSheet.ID}.davo`;

            fs.writeFile(filePath, newSheet.toJson(), error => {
                if (error) {
                    console.error("Writing Davo file failed!");
                    return;
                }
            });

            resolve(newSheet);
        });

        return creatingSheet.then(sheet => {
            this.addSheet(sheet);

            return sheet;
        });
    }

    @action.bound
    private addSheet(sheet: Sheet) {
        this._sheets.push(sheet);
    }

    async saveSheet(sheet: Sheet): Promise<Sheet> {
        return new Promise<Sheet>(resolve => {
            const filePath = `dataPath/${sheet.ID}.davo`;

            fs.writeFile(filePath, sheet.toJson(), error => {
                if (error) {
                    console.error("Writing Davo file failed!");
                    return;
                }
            });

            resolve(sheet);
        });
    }

    resaveFiles(): boolean {
        this._sheets.forEach(async sheet => {
            await this.saveSheet(sheet);
        });

        return true;
    }
}
