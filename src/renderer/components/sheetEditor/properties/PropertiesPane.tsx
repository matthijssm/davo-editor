import * as React from 'react';
import { Group, HeaderBar } from '../../explorer/HeaderBar';
import { HeaderBarTab } from '../../explorer/HeaderBarTab';
import {
    SheetEditorViewModel,
    PropertiesPaneTabs,
} from '../../../viewModels/SheetEditorViewModel';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { MetaPane } from './MetaPane';

type PropertiesPaneProps = {
    viewModel: SheetEditorViewModel;
};

const styles = require('./PropertiesPane.scss');

@observer
export class PropertiesPane extends React.Component<PropertiesPaneProps> {
    render() {
        const { viewModel } = this.props;

        return (
            <div className={styles.propertiesPane}>
                <HeaderBar>
                    <HeaderBarTab
                        fullWidth={true}
                        isActive={viewModel.openPropertiesPane == 'Meta'}
                        label="Meta"
                        onClick={() => this.setOpenPropertiesPane('Meta')}
                    />
                    <HeaderBarTab
                        fullWidth={true}
                        label="Sheet"
                        isActive={viewModel.openPropertiesPane == 'Sheet'}
                        onClick={() => this.setOpenPropertiesPane('Sheet')}
                    />
                </HeaderBar>
                <div className={styles.content}>
                    {viewModel.openPropertiesPane == 'Meta' ? (
                        <MetaPane viewModel={viewModel} />
                    ) : null}
                </div>
            </div>
        );
    }

    @action
    private setOpenPropertiesPane = (value: PropertiesPaneTabs) => {
        this.props.viewModel.openPropertiesPane = value;
    };
}
