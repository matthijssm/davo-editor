import React from 'react';
import classNames from 'classNames';

type HeaderBarProps = {};

export class HeaderBar extends React.Component<HeaderBarProps> {
    private styles = require('./HeaderBar.scss');

    render() {
        return <div className="headerBar">{this.props.children}</div>;
    }
}

type GroupProps = {
    align?: string;
};

export class Group extends React.Component<GroupProps> {
    render() {
        const { align, children } = this.props;

        const style = classNames('headerBarGroup', {
            isLeft: align === 'left',
            isCenter: align === 'center',
            isRight: align === 'right',
        });

        return <div className={style}>{children}</div>;
    }
}
