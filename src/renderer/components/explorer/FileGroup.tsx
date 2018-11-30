import React from 'react';
import classNames from 'classNames';
import {
    IconDefinition,
    faFileAlt,
    faCaretLeft,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretCircleDown,
    faCaretDown,
} from '@fortawesome/pro-regular-svg-icons';
import { Sheet } from '../../model/Sheet';
import { observer } from 'mobx-react';
import { File } from './File';

type FileGroupProps = {
    title: string;
    active: boolean;
    icon: IconDefinition;
    files: Sheet[];
    onClick?: () => void;
};

@observer
export class FileGroup extends React.Component<FileGroupProps> {
    private style = require('./FileGroup.scss');

    render() {
        const { title, active, icon } = this.props;

        const style = classNames('fileGroupHeader', {
            isActive: active,
        });

        return (
            <div className="fileGroup">
                <div className={style} onClick={this.props.onClick}>
                    <span className="icon">
                        <FontAwesomeIcon icon={icon} />
                    </span>
                    <span className="title">{title}</span>
                    <span className="caret">
                        <FontAwesomeIcon
                            icon={active ? faCaretDown : faCaretLeft}
                        />
                    </span>
                </div>
                <div className="fileGroupFiles">
                    {active && this.renderFiles()}
                </div>
            </div>
        );
    }

    private renderFiles() {
        const files = this.props.files;

        return files.map(file => {
            return <File sheet={file} key={file.ID} />;
        });
    }
}
