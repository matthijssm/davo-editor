import * as React from 'react';
import { FormField } from './FormField';

type InputControlFieldProps = {
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const styles = require('./InputControlField.scss');

export class InputControlField extends React.Component<InputControlFieldProps> {
    render() {
        const { label, value, onChange } = this.props;
        return (
            <FormField label={label}>
                <input
                    value={value}
                    onChange={onChange}
                    className={styles.inputControl}
                />
            </FormField>
        );
    }
}
