import React, { ChangeEvent } from 'react';
import { SheetEditorViewModel } from '../../viewModels/SheetEditorViewModel';
import { observer } from 'mobx-react';
import { HeaderBar, Group } from '../explorer/HeaderBar';
import { HeaderBarTab } from '../explorer/HeaderBarTab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePlus, faFileImport } from '@fortawesome/pro-light-svg-icons';
import { EditableHeaderBarTab } from '../explorer/EditableHeaderBarTab';
import { action } from 'mobx';
import { PropertiesPane } from './properties/PropertiesPane';

type SheetEditorProps = {
    viewModel: SheetEditorViewModel;
};

const styles = require('./SheetEditor.scss');

@observer
export class SheetEditor extends React.Component<SheetEditorProps> {
    render() {
        const { viewModel } = this.props;
        return (
            <>
                <div className="editorPaneContainer">
                    <HeaderBar>
                        <Group align="left">
                            <HeaderBarTab selectionDisabled={true}>
                                SHEET EDITOR
                            </HeaderBarTab>
                        </Group>
                        <Group align="center">
                            <EditableHeaderBarTab
                                value={viewModel.label}
                                onChange={this.setLabel}
                                onBlur={this.saveSheet}
                                placeholder="Untitled"
                            />
                            <EditableHeaderBarTab
                                value={viewModel.document.subtitle}
                                onChange={this.setSubtitle}
                                onBlur={this.saveSheet}
                                placeholder="Subtitle"
                            />
                        </Group>
                        <Group align="right">
                            <HeaderBarTab icon={faFilePlus} />
                            <HeaderBarTab icon={faFileImport} />
                        </Group>
                    </HeaderBar>
                    <div className="sheetEditor">
                        The current active sheet is: {viewModel.label}
                    </div>
                </div>
                <div className="propertiesPaneContainer">
                    <PropertiesPane />
                </div>
            </>
        );
    }

    @action
    private setLabel = (event: ChangeEvent<HTMLInputElement>) => {
        const { viewModel } = this.props;

        viewModel.updateTitle(event.target.value);
    };

    private setSubtitle = (event: ChangeEvent<HTMLInputElement>) => {
        const { viewModel } = this.props;

        viewModel.updateSubtitle(event.target.value);
    };

    private saveSheet = () => {
        const { viewModel } = this.props;

        viewModel.saveSheet();
    };
}
