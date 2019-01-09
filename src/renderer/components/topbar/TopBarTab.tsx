import React from 'react';
import classNames from 'classNames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import {
    faSpinnerThird,
    IconDefinition,
} from '@fortawesome/pro-light-svg-icons';
import { observer } from 'mobx-react';

type TopBarTabProps = {
    label?: string;
    icon?: IconDefinition;
    active?: boolean;
    closable?: boolean;
    loading?: boolean;
    onClick?: () => void;
    onClose?: () => void;
};

@observer
export class TopBarTab extends React.Component<TopBarTabProps> {
    render() {
        const styles = require('./TopBarTab.scss');
        const { active, closable, loading, label, icon } = this.props;

        const style = classNames({
            topBarTab: true,
            isActive: active,
        });

        return (
            <div className={style} onClick={this.props.onClick}>
                {label ? label : null}
                {icon ? <FontAwesomeIcon icon={icon} size="lg" /> : null}

                {closable && (
                    <div className="closeIcon" onClick={this.onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                )}

                {loading && (
                    <div className="spinner">
                        <FontAwesomeIcon icon={faSpinnerThird} spin />
                    </div>
                )}
            </div>
        );
    }

    private calculateMaxWidth = () => {};

    private onClose = (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();

        this.props.onClose();
    };
}
