import React from 'react';
import { SheetEditorViewModel } from '../../viewModels/SheetEditorViewModel';
import { observer } from 'mobx-react';

type SheetEditorProps = {
    viewModel: SheetEditorViewModel;
};

@observer
export class SheetEditor extends React.Component<SheetEditorProps> {
    render() {
        const { viewModel } = this.props;
        return <div>The current active sheet is: {viewModel.label}</div>;
    }
}
