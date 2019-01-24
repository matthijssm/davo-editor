import React from "react";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePlus, faFileImport, faUnicorn } from "@fortawesome/pro-light-svg-icons";
import { EditorState } from "base";
import { Bar, Group, BarTab } from "essentials";

import { FileGroup } from "./FileGroup";
import { FileExplorerViewModel } from "../../../viewModels/FileExplorerViewModel";
import { ISheetService } from "../../../services/sheets/ISheetService";
import { Sheet } from "../../../model/Sheet";

const styles = require("./FileExplorer.scss");

type FileExplorerProps = {
    viewModel: FileExplorerViewModel;
    editorState: EditorState;
};

@observer
export class FileExplorer extends React.Component<FileExplorerProps> {
    constructor(props: FileExplorerProps) {
        super(props);
    }

    render() {
        return (
            <div className={styles.fileExplorer}>
                <Bar>
                    <Group align="left">
                        <BarTab label="EXPLORER" selectionDisabled={true} />
                    </Group>
                    <Group align="right">
                        <BarTab onClick={this.createFile} icon={faFilePlus} />
                        <BarTab onClick={this.resaveFiles} icon={faUnicorn} />
                    </Group>
                </Bar>
                <div className={styles.fileServices}>{this.renderFileServices()}</div>
            </div>
        );
    }

    private renderFileServices() {
        const { viewModel, editorState } = this.props;
        return viewModel.services.map(service => {
            return (
                <FileGroup
                    icon={service.icon}
                    title={service.name}
                    files={service.sheets}
                    active={viewModel.isActive(service)}
                    onClick={this.onClick(service)}
                    key={service.name}
                    onSheetSelected={this.onSheetSelected}
                    selectedSheet={editorState.activeEditor ? editorState.activeEditor.document : null}
                />
            );
        });
    }

    private onClick = (service: ISheetService) => {
        return () => {
            const { viewModel } = this.props;
            viewModel.toggleActiveService(service);
        };
    };

    private onSheetSelected = (sheet: Sheet) => {
        const { editorState } = this.props;

        editorState.openEditor(sheet);
    };

    private createFile = () => {
        const { viewModel, editorState } = this.props;

        const newFilePromise = viewModel.createFile();
        if (newFilePromise) {
            newFilePromise.then(sheet => {
                editorState.openEditor(sheet);
            });
        }
    };

    private resaveFiles = () => {
        this.props.viewModel.resaveFiles();
    };

    private importFile = () => {
        const { viewModel } = this.props;

        viewModel.importFile();
    };
}
