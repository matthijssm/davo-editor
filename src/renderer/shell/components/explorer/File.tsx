import React, { MouseEvent } from "react";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/pro-light-svg-icons";
import { styled, css } from "essentials";

import { IDocument } from "../../../model/IDocument";

type FileProps = {
    isSelected: boolean;
    sheet: IDocument;
    onSelect: (s: IDocument) => void;
};

const FileElement = styled("div")<{ isSelected?: boolean }>`
    padding: 7px 15px;
    color: ${p => p.theme.colors.tertiaryInverted};
    font-size: ${p => p.theme.font.fontSizeBody};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${p =>
        !p.isSelected &&
        css`
            &:hover {
                background: ${p.theme.colors.tertiaryHighlight};
            }
        `}

    ${p =>
        p.isSelected &&
        css`
            background: ${p.theme.colors.attentionHighlight};
            color: ${p.theme.colors.attentionInverted};

            ${Subtitle} {
                color: ${p.theme.colors.attentionFaded};
            }
        `};
`;

const Icon = styled.span`
    margin-right: 10px;
    font-size: ${p => p.theme.font.fontSizeSmall};
`;

const Subtitle = styled.span`
    color: ${p => p.theme.colors.tertiaryFaded};
    margin-left: 5px;
`;

@observer
export class File extends React.Component<FileProps> {
    render() {
        const { sheet, isSelected } = this.props;

        return (
            <FileElement isSelected={isSelected} onClick={this.onClick}>
                <Icon>
                    <FontAwesomeIcon icon={faFileAlt} size="lg" />
                </Icon>
                <span>{sheet.title}</span>
                <Subtitle>{sheet.subtitle}</Subtitle>
            </FileElement>
        );
    }

    private onClick = (event: MouseEvent) => {
        const { sheet } = this.props;

        this.props.onSelect(sheet);
    };
}
