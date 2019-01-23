import * as React from 'react';
import { Key, Note, Mode, Modifier } from '../../../../model/Key';
import { FormField } from './FormField';
import {
    RadioButtonGroup,
    InsideLabelRadioButton,
} from '../../../../../essentials';
import { observer } from 'mobx-react';

type KeySelectFieldProps = {
    activeKey: Key;
    onChange: (key: Key) => void;
};

@observer
export class KeySelectField extends React.Component<KeySelectFieldProps> {
    render() {
        const { activeKey } = this.props;
        return (
            <>
                <FormField label="Key">
                    <RadioButtonGroup
                        onChange={this.onNoteChange}
                        currentValue={Note[activeKey.note]}>
                        <InsideLabelRadioButton caption="A" value="A" />
                        <InsideLabelRadioButton caption="B" value="B" />
                        <InsideLabelRadioButton caption="C" value="C" />
                        <InsideLabelRadioButton caption="D" value="D" />
                        <InsideLabelRadioButton caption="E" value="E" />
                        <InsideLabelRadioButton caption="F" value="F" />
                        <InsideLabelRadioButton caption="G" value="G" />
                    </RadioButtonGroup>
                </FormField>
                <FormField>
                    <RadioButtonGroup
                        onChange={this.onModifierChange}
                        currentValue={Modifier[activeKey.modifier]}>
                        <InsideLabelRadioButton caption="#" value="Sharp" />
                        <InsideLabelRadioButton caption="b" value="Flat" />
                        <InsideLabelRadioButton caption="None" value="None" />
                    </RadioButtonGroup>
                </FormField>
                <FormField>
                    <RadioButtonGroup
                        onChange={this.onModeChange}
                        currentValue={Mode[activeKey.mode]}>
                        <InsideLabelRadioButton caption="Major" value="Major" />
                        <InsideLabelRadioButton caption="Minor" value="Minor" />
                    </RadioButtonGroup>
                </FormField>
            </>
        );
    }

    private onNoteChange = (newValue: keyof typeof Note) => {
        const { activeKey } = this.props;
        activeKey.note = Note[newValue];

        this.props.onChange(activeKey);
    };

    private onModifierChange = (newValue: keyof typeof Modifier) => {
        const { activeKey } = this.props;
        activeKey.modifier = Modifier[newValue];

        this.props.onChange(activeKey);
    };

    private onModeChange = (newValue: keyof typeof Mode) => {
        const { activeKey } = this.props;
        activeKey.mode = Mode[newValue];

        this.props.onChange(activeKey);
    };
}
