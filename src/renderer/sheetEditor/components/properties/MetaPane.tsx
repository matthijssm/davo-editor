import * as React from "react";
import { SheetEditorViewModel } from "../../../viewModels/SheetEditorViewModel";
import { KeySelectField } from "./controls/KeySelectField";
import { Key } from "../../../model/Key";
import { observer } from "mobx-react";
import { NumberSelectField } from "./controls/NumberSelectField";

type MetaPaneProps = {
    viewModel: SheetEditorViewModel;
};

@observer
export class MetaPane extends React.Component<MetaPaneProps> {
    render() {
        const { viewModel } = this.props;

        const key = viewModel.document.key;
        const capo = viewModel.document.capo;
        const tempo = viewModel.document.tempo;

        return (
            <>
                <KeySelectField activeKey={key} onChange={this.updateKey} label="Key" />

                <NumberSelectField label="Capo" value={capo} onChange={this.updateCapo} max={12} min={0} />

                <NumberSelectField label="Tempo" value={tempo} onChange={this.updateTempo} max={500} min={0} />
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

    private updateTempo = (tempo: number) => {
        this.props.viewModel.updateTempo(tempo);
        this.props.viewModel.saveSheet();
    };
}
