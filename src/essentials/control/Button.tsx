import * as React from 'react';

type ButtonProps = {
    value?: string;
    onClick?: () => void;
};

const styles = require('./Button.scss');

export class Button extends React.Component<ButtonProps> {
    render() {
        const { value, onClick } = this.props;

        return (
            <button onClick={onClick} className={styles.button}>
                {value}
            </button>
        );
    }
}
