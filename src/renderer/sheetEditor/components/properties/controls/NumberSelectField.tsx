import * as React from "react";
import { FormField } from "./FormField";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { Input, ControlGroup, Button } from "essentials";

type NumberSelectFieldProps = {
    min?: number;
    max?: number;
    value: number;
    onChange?: (val: number) => void;
    label?: string;
};

@observer
export class NumberSelectField extends React.Component<NumberSelectFieldProps> {
    static defaultProps = {
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER
    };
    @observable private _value: string;
    @observable private isEditing: boolean = false;

    constructor(props: NumberSelectFieldProps) {
        super(props);
        this._value = props.value.toString();
    }

    render() {
        const { value, label } = this.props;
        return (
            <FormField label={label}>
                <ControlGroup>
                    <Button onClick={this.minusOne} fullWidth={true}>
                        -
                    </Button>
                    <Input type="text" value={this.isEditing ? this._value : value.toString()} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} />
                    <Button onClick={this.plusOne} fullWidth={true}>
                        +
                    </Button>
                </ControlGroup>
            </FormField>
        );
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this._value = event.target.value;
    };

    @action
    private onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { min, max, onChange } = this.props;
        const newValue = parseInt(event.target.value, 10);

        if (!isNaN(newValue as any)) {
            if (newValue >= min && newValue <= max) {
                onChange(newValue);
            }
        }

        this._value = "";
        this.isEditing = false;
    };

    @action
    private onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        this.isEditing = true;
        this._value = event.target.value;
        event.target.select();
    };

    private minusOne = () => {
        const { min, onChange, value } = this.props;
        const newValue = value - 1;
        if (newValue >= min) {
            onChange(newValue);
            this._value = newValue.toString();
        }
    };

    private plusOne = () => {
        const { max, onChange, value } = this.props;
        const newValue = value + 1;
        if (newValue <= max) {
            onChange(newValue);
            this._value = newValue.toString();
        }
    };
}
