import React, { MouseEvent } from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import { IconDefinition, faFileAlt, faCaretLeft } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretCircleDown, faCaretDown } from "@fortawesome/pro-regular-svg-icons";

import { File } from "./File";
import { IDocument } from "../../../model/IDocument";
import { Sheet } from "../../../model/Sheet";

type FileGroupProps = {
    title: string;
    active: boolean;
    icon: IconDefinition;
    files: IDocument[];
    selectedSheet: IDocument;
    onClick?: () => void;
    onSheetSelected: (s: IDocument) => void;
};

const styles = require("./FileGroup.scss");

@observer
export class FileGroup extends React.Component<FileGroupProps> {
    render() {
        const { title, active, icon } = this.props;

        const style = classNames(styles.fileGroupHeader, {
            [styles.isActive]: active
        });

        return (
            <div className={styles}>
                <div className={style} onClick={this.props.onClick}>
                    <span className={styles.icon}>
                        <FontAwesomeIcon icon={icon} />
                    </span>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.caret}>
                        <FontAwesomeIcon icon={active ? faCaretDown : faCaretLeft} />
                    </span>
                </div>
                <div className={styles.fileGroupFiles}>{active && this.renderFiles()}</div>
            </div>
        );
    }

    private renderFiles() {
        const files = this.props.files;

        return files.map(file => {
            return (
                <File
                    sheet={file}
                    key={file.ID}
                    onSelect={this.onSelect}
                    isSelected={this.props.selectedSheet ? this.props.selectedSheet.ID === file.ID : false}
                />
            );
        });
    }

    private onSelect = (sheet: Sheet) => {
        this.props.onSheetSelected(sheet);
    };
}
