import * as React from 'react';

type InputProps = {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    value?: string;
    type?: string;
};

const styles = require('./Input.scss');

export class Input extends React.Component<InputProps> {
    render() {
        return <input {...this.props} className={styles.input} />;
    }
}
