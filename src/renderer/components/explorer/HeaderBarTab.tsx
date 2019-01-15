import React from 'react';
import classNames from 'classNames';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type HeaderBarTabProps = {
    label?: string;
    icon?: IconDefinition;
    selectionDisabled?: boolean;
    isActive?: boolean;
    fullWidth?: boolean;
    onClick?: () => void;
};

export class HeaderBarTab extends React.Component<HeaderBarTabProps> {
    private styles = require('./HeaderBarTab.scss');
    render() {
        const {
            label,
            icon,
            selectionDisabled,
            fullWidth,
            isActive,
        } = this.props;

        const style = classNames('headerBarTab', {
            isSelectionDisabled: selectionDisabled,
            isFullWidth: fullWidth,
            isActive: isActive,
        });

        return (
            <div className={style} onClick={this.props.onClick}>
                {icon && <FontAwesomeIcon icon={icon} size="lg" />}
                {label && label.toUpperCase()}
            </div>
        );
    }
}
