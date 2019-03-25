import * as React from "react";
import { Key } from "../../../../model/Key";
import { FormField } from "./FormField";
import { RadioButtonGroup, Button } from "essentials";
import { observer } from "mobx-react";
import { Note, Modifier, Mode } from "../../../../model/IMusic";

type KeySelectFieldProps = {
    activeKey: Key;
    label?: string;
    onChange: (key: Key) => void;
};

@observer
export class KeySelectField extends React.Component<KeySelectFieldProps> {
    render() {
        const { activeKey, label } = this.props;
        return (
            <>
                <FormField label={label}>
                    <RadioButtonGroup onChange={this.onNoteChange} currentValue={Note[activeKey.note]}>
                        <Button value="A">A</Button>
                        <Button value="B">B</Button>
                        <Button value="C">C</Button>
                        <Button value="D">D</Button>
                        <Button value="E">E</Button>
                        <Button value="F">F</Button>
                        <Button value="G">G</Button>
                    </RadioButtonGroup>
                </FormField>
                <FormField>
                    <RadioButtonGroup onChange={this.onModifierChange} currentValue={Modifier[activeKey.modifier]}>
                        <Button value="Sharp">#</Button>
                        <Button value="Flat">b</Button>
                        <Button value="None">None</Button>
                    </RadioButtonGroup>
                </FormField>
                <FormField>
                    <RadioButtonGroup onChange={this.onModeChange} currentValue={Mode[activeKey.mode]}>
                        <Button value="Major">Major</Button>
                        <Button value="Minor">Minor</Button>
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
