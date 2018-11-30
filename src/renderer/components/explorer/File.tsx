import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/pro-light-svg-icons';

import { Sheet } from '../../model/Sheet';

type FileProps = {
    sheet: Sheet;
};

export class File extends React.Component<FileProps> {
    private styles = require('./File.scss');

    render() {
        const { sheet } = this.props;
        return (
            <div className="file">
                <span className="icon">
                    <FontAwesomeIcon icon={faFileAlt} size="lg" />
                </span>
                <span className="title">{sheet.title}</span>
                <span className="subtitle">{sheet.subtitle}</span>
            </div>
        );
    }
}
