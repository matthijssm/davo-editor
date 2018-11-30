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

export class WindowButton extends React.Component<WindowButtonProps> {
    render() {
        const styles = require('./WindowButton.scss');

        const style = classNames({
            windowButton: true,
            closeType: this.props.type === WindowButtonType.CLOSE,
            minimizeType: this.props.type === WindowButtonType.MINIMIZE,
            fullscreenType: this.props.type === WindowButtonType.FULLSCREEN,
            disabled: this.props.disabled,
        });

        return (
            <div
                className={style}
                onClick={!this.props.disabled && this.props.onclick}
            />
        );
    }
}
