import React from 'react';
import classNames from 'classNames';

type HeaderBarProps = {};

const styles = require('./HeaderBar.scss');

export class HeaderBar extends React.Component<HeaderBarProps> {
    render() {
        return <div className={styles.headerBar}>{this.props.children}</div>;
    }
}

type GroupProps = {
    align?: string;
};

export class Group extends React.Component<GroupProps> {
    render() {
        const { align, children } = this.props;

        const style = classNames(styles.headerBarGroup, {
            [styles.isLeft]: align === 'left',
            [styles.isCenter]: align === 'center',
            [styles.sRight]: align === 'right',
        });

        return <div className={style}>{children}</div>;
    }
}
