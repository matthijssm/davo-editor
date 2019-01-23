import * as React from 'react';
import { InputControlField } from './controls/InputControlField';
import { SheetEditorViewModel } from '../../../viewModels/SheetEditorViewModel';
import { KeySelectField } from './controls/KeySelectField';
import { Key } from '../../../model/Key';
import { observer } from 'mobx-react';
import { NumberSelectField } from './controls/NumberSelectField';

type MetaPaneProps = {
    viewModel: SheetEditorViewModel;
};

@observer
export class MetaPane extends React.Component<MetaPaneProps> {
    render() {
        const { viewModel } = this.props;

        const key = viewModel.document.key;
        const capo = viewModel.document.capo;

        return (
            <>
                <KeySelectField activeKey={key} onChange={this.updateKey} />

                <NumberSelectField
                    label="Capo"
                    value={capo}
                    onChange={this.updateCapo}
                />
            </>
        );
    }

    private updateKey = (key: Key) => {
        this.props.viewModel.updateKey(key);
        this.props.viewModel.saveSheet();
    };

    private updateCapo = (capo: number) => {
        this.props.viewModel.updateCapo(capo);
        this.props.viewModel.saveSheet();
    };
}
