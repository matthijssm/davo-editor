import React from 'react';
import classNames from 'classNames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { faSpinnerThird } from '@fortawesome/pro-light-svg-icons';

type TopBarTabProps = {
    active?: boolean;
    closable?: boolean;
    loading?: boolean;
    onClick?: () => void;
    onClose?: () => void;
};

export class TopBarTab extends React.Component<TopBarTabProps> {
    render() {
        const styles = require('./TopBarTab.scss');
        const { active, children, closable, loading } = this.props;

        const style = classNames({
            topBarTab: true,
            isActive: active,
        });

        return (
            <div className={style} onClick={this.props.onClick}>
                {children}

                {closable && (
                    <div className="closeIcon" onClick={this.props.onClose}>
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
}
