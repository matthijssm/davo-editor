import React from "react";
import { observer } from "mobx-react";
import { faFilePlus, faUnicorn } from "@fortawesome/pro-light-svg-icons";
import { EditorState } from "shell";
import { Bar, Group, BarTab, styled } from "essentials";

import { FileGroup } from "./FileGroup";
import { FileExplorerViewModel } from "../../../viewModels/FileExplorerViewModel";
import { ISheetService } from "../../../services/sheets/ISheetService";
import { Sheet } from "../../../model/Sheet";

type FileExplorerProps = {
    viewModel: FileExplorerViewModel;
    editorState: EditorState;
};

const FileExplorerElement = styled.div`
    height: 100%;
    min-width: 300px;
    max-width: 300px;
    background: ${p => p.theme.colors.tertiary};
    color: ${p => p.theme.colors.tertiaryInverted};
    user-select: none;
    display: flex;
    flex-direction: column;
`;

const FileServices = styled.div`
    flex: 1;
    overflow-y: scroll;
`;

@observer
export class FileExplorer extends React.Component<FileExplorerProps> {
    constructor(props: FileExplorerProps) {
        super(props);
    }

    render() {
        return (
            <FileExplorerElement>
                <Bar>
                    <Group align="left">
                        <BarTab label="Explorer" selectionDisabled={true} />
                    </Group>
                    <Group align="right">
                        <BarTab onClick={this.createFile} icon={faFilePlus} />
                        <BarTab onClick={this.resaveFiles} icon={faUnicorn} />
                    </Group>
                </Bar>
                <FileServices>{this.renderFileServices()}</FileServices>
            </FileExplorerElement>
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
