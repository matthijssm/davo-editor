import React, { MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/pro-light-svg-icons';
import classNames from 'classNames';
import { Sheet } from '../../model/Sheet';
import { observer } from 'mobx-react';

type FileProps = {
    isSelected: boolean;
    sheet: Sheet;
    onSelect: (s: Sheet) => void;
};

@observer
export class File extends React.Component<FileProps> {
    private styles = require('./File.scss');

    render() {
        const { sheet, isSelected: isSelected } = this.props;

        const styles = classNames('file', { isSelected: isSelected });

        return (
            <div className={styles} onClick={this.onClick}>
                <span className="icon">
                    <FontAwesomeIcon icon={faFileAlt} size="lg" />
                </span>
                <span className="title">{sheet.title}</span>
                <span className="subtitle">{sheet.subtitle}</span>
            </div>
        );
    }

    private onClick = (event: MouseEvent) => {
        const { sheet } = this.props;

        this.props.onSelect(sheet);
    };
}
