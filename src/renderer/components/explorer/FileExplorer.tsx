import React from 'react';
import { HeaderBar, Group } from './HeaderBar';
import { HeaderBarTab } from './HeaderBarTab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilePlus,
    faFileImport,
    faUnicorn,
} from '@fortawesome/pro-light-svg-icons';
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
            <div className={styles.fileExplorer}>
                <HeaderBar>
                    <Group align="left">
                        <HeaderBarTab
                            label="EXPLORER"
                            selectionDisabled={true}
                        />
                    </Group>
                    <Group align="right">
                        <HeaderBarTab
                            onClick={this.createFile}
                            icon={faFilePlus}
                        />
                        <HeaderBarTab
                            onClick={this.resaveFiles}
                            icon={faUnicorn}
                        />
                    </Group>
                </HeaderBar>
                <div className={styles.fileServices}>
                    {this.renderFileServices()}
                </div>
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
