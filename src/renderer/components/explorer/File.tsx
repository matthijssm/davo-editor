import React, { MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/pro-light-svg-icons';
import classNames from 'classNames';
import { observer } from 'mobx-react';
import { IDocument } from '../../model/IDocument';

type FileProps = {
    isSelected: boolean;
    sheet: IDocument;
    onSelect: (s: IDocument) => void;
};

const styles = require('./File.scss');

@observer
export class File extends React.Component<FileProps> {
    render() {
        const { sheet, isSelected: isSelected } = this.props;

        const classes = classNames(styles.file, {
            [styles.isSelected]: isSelected,
        });

        return (
            <div className={classes} onClick={this.onClick}>
                <span className={styles.icon}>
                    <FontAwesomeIcon icon={faFileAlt} size="lg" />
                </span>
                <span className={styles.title}>{sheet.title}</span>
                <span className={styles.subtitle}>{sheet.subtitle}</span>

                <span className={styles.subtitle}>{sheet.capo}</span>
            </div>
        );
    }

    private onClick = (event: MouseEvent) => {
        const { sheet } = this.props;

        this.props.onSelect(sheet);
    };
}
