import React from 'react';
import classNames from 'classNames';

type HeaderBarTabProps = {
    selectionDisabled?: boolean;
    onClick?: () => void;
};

export class HeaderBarTab extends React.Component<HeaderBarTabProps> {
    private styles = require('./HeaderBarTab.scss');
    render() {
        const { children, selectionDisabled } = this.props;

        const style = classNames('headerBarTab', {
            isSelectionDisabled: selectionDisabled,
        });

        return (
            <div className={style} onClick={this.props.onClick}>
                {children}
            </div>
        );
    }
}
