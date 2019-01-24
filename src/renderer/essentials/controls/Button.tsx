import * as React from "react";
import classNames from "classnames";

type ButtonProps = {
    value?: string;
    onClick?: () => void;
    fullWidth?: boolean;
};

const styles = require("./Button.scss");

export class Button extends React.Component<ButtonProps> {
    render() {
        const { value, onClick, fullWidth } = this.props;

        const className = classNames(styles.button, {
            [styles.isFullWidth]: fullWidth
        });

        return (
            <button onClick={onClick} className={className}>
                {value}
            </button>
        );
    }
}
