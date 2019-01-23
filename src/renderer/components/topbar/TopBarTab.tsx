import React from 'react';
import classNames from 'classNames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCircle } from '@fortawesome/pro-regular-svg-icons';
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
    unsaved?: boolean;
    onClick?: () => void;
    onClose?: () => void;
};

const styles = require('./TopBarTab.scss');

@observer
export class TopBarTab extends React.Component<TopBarTabProps> {
    render() {
        const { active, closable, loading, label, icon, unsaved } = this.props;

        const style = classNames(styles.topBarTab, {
            [styles.isActive]: active,
        });

        return (
            <div className={style} onClick={this.props.onClick}>
                <div className={styles.label}>
                    {icon ? <FontAwesomeIcon icon={icon} size="lg" /> : null}
                    {label ? <p className={styles.labelText}>{label}</p> : null}
                </div>

                {closable && (
                    <div className={styles.closeIcon} onClick={this.onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                )}

                {loading && (
                    <div className={styles.spinner}>
                        <FontAwesomeIcon icon={faSpinnerThird} spin />
                    </div>
                )}

                {unsaved && (
                    <div className={styles.closeIcon} onClick={this.onClose}>
                        <FontAwesomeIcon icon={faCircle} />
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
