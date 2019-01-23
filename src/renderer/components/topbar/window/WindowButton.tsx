import React from 'react';
import classNames from 'classNames';
type WindowButtonProps = {
    onclick?: () => void;
    type: WindowButtonType;
    disabled?: boolean;
};

export enum WindowButtonType {
    CLOSE,
    MINIMIZE,
    FULLSCREEN,
}

const styles = require('./WindowButton.scss');

export class WindowButton extends React.Component<WindowButtonProps> {
    render() {
        const style = classNames({
            [styles.windowButton]: true,
            [styles.closeType]: this.props.type === WindowButtonType.CLOSE,
            [styles.minimizeType]:
                this.props.type === WindowButtonType.MINIMIZE,
            [styles.fullscreenType]:
                this.props.type === WindowButtonType.FULLSCREEN,
            [styles.disabled]: this.props.disabled,
        });

        return (
            <div
                className={style}
                onClick={!this.props.disabled && this.props.onclick}
            />
        );
    }
}
