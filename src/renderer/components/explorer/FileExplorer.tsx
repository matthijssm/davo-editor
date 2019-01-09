import React from 'react';
import { HeaderBar, Group } from './HeaderBar';
import { HeaderBarTab } from './HeaderBarTab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePlus, faFileImport } from '@fortawesome/pro-light-svg-icons';
import { FileGroup } from './FileGroup';
import { FileExplorerViewModel } from '../../viewModels/FileExplorerViewModel';
import { observer } from 'mobx-react';
import { Sheet } from '../../model/Sheet';
import { EditorState } from '../EditorState';

const styles = require('./FileExplorer.scss');

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
            <div className="fileExplorer">
                <HeaderBar>
                    <Group align="left">
                        <HeaderBarTab selectionDisabled={true}>
                            EXPLORER
                        </HeaderBarTab>
                    </Group>
                    <Group align="right">
                        <HeaderBarTab onClick={this.createFile}>
                            <FontAwesomeIcon icon={faFilePlus} size="lg" />
                        </HeaderBarTab>
                        <HeaderBarTab onClick={this.importFile}>
                            <FontAwesomeIcon icon={faFileImport} size="lg" />
                        </HeaderBarTab>
                    </Group>
                </HeaderBar>
                <div className="fileServices">{this.renderFileServices()}</div>
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
                    onClick={() => {
                        viewModel.toggleActiveService(service);
                    }}
                    key={service.name}
                    onSheetSelected={this.onSheetSelected}
                    selectedSheet={
                        editorState.activeEditor
                            ? editorState.activeEditor.document
                            : null
                    }
                />
            );
        });
    }

    private onSheetSelected = (sheet: Sheet) => {
        const { editorState } = this.props;

        editorState.openEditor(sheet);
    };

    private createFile = () => {
        const { viewModel, editorState } = this.props;

        viewModel.createFile().then(sheet => {
            editorState.openEditor(sheet);
        });
    };

    private importFile = () => {
        const { viewModel } = this.props;

        viewModel.importFile();
    };
}
