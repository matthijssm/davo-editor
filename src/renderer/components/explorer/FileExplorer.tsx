import React from 'react';
import { EditorState } from '../EditorState';
import { HeaderBar, Group } from './HeaderBar';
import { HeaderBarTab } from './HeaderBarTab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilePlus,
    faFolderPlus,
    faFolder,
} from '@fortawesome/pro-light-svg-icons';
import { FileGroup } from './FileGroup';
import { FileExplorerViewModel } from '../../viewModels/FileExplorerViewModel';
import { observer } from 'mobx-react';

type FileExplorerProps = {
    viewModel: FileExplorerViewModel;
};

@observer
export class FileExplorer extends React.Component<FileExplorerProps> {
    private styles = require('./FileExplorer.scss');

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
                    </Group>
                </HeaderBar>
                <div className="fileServices">{this.renderFileServices()}</div>
            </div>
        );
    }

    private renderFileServices() {
        const { viewModel } = this.props;
        return viewModel.services.map(service => {
            return (
                <FileGroup
                    icon={service.icon}
                    title={service.name}
                    files={service.sheets}
                    active={viewModel.isActive(service)}
                    onClick={() => {
                        viewModel.toggleActive(service);
                    }}
                    key={service.name}
                />
            );
        });
    }

    private createFile = () => {
        const { viewModel } = this.props;

        viewModel.createFile();
    };
}
