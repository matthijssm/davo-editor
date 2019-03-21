import React, { MouseEvent } from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import { IconDefinition, faFileAlt, faCaretLeft } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretCircleDown, faCaretDown } from "@fortawesome/pro-regular-svg-icons";

import { File } from "./File";
import { IDocument } from "../../../model/IDocument";
import { Sheet } from "../../../model/Sheet";
import { styled, css } from "essentials";

type FileGroupProps = {
    title: string;
    active: boolean;
    icon: IconDefinition;
    files: IDocument[];
    selectedSheet: IDocument;
    onClick?: () => void;
    onSheetSelected: (s: IDocument) => void;
};

const FileGroupElement = styled("div")<{ isActive?: boolean }>`
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
    border-bottom: 1px solid ${p => p.theme.colors.tertiaryHighlight};
    color: ${p => p.theme.colors.tertiaryInverted};
    font-size: ${p => p.theme.font.fontSizeBody};

    ${p =>
        p.isActive &&
        css`
            background: ${p.theme.colors.attention};
            color: ${p.theme.colors.attentionInverted};
            border-bottom: 0;
        `};
`;

const Icon = styled.span`
    margin-right: 10px;
`;

const Caret = styled.span`
    float: right;
`;

@observer
export class FileGroup extends React.Component<FileGroupProps> {
    render() {
        const { title, active, icon } = this.props;

        return (
            <>
                <FileGroupElement isActive={active} onClick={this.props.onClick}>
                    <Icon>
                        <FontAwesomeIcon icon={icon} />
                    </Icon>
                    <span>{title}</span>
                    <Caret>
                        <FontAwesomeIcon icon={active ? faCaretDown : faCaretLeft} />
                    </Caret>
                </FileGroupElement>
                {active && this.renderFiles()}
            </>
        );
    }

    private renderFiles() {
        const files = this.props.files;

        return files.map(file => {
            return <File sheet={file} key={file.ID} onSelect={this.onSelect} isSelected={this.props.selectedSheet ? this.props.selectedSheet.ID === file.ID : false} />;
        });
    }

    private onSelect = (sheet: Sheet) => {
        this.props.onSheetSelected(sheet);
    };
}
