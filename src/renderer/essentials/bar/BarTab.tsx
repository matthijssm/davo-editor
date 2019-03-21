import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled, css } from "../styled-components";

type HeaderBarTabProps = {
    label?: string;
    icon?: IconDefinition;
    selectionDisabled?: boolean;
    isActive?: boolean;
    fullWidth?: boolean;
    isEditable?: boolean;
    onClick?: () => void;
};

export const BarTabElement = styled("div")<HeaderBarTabProps>`
    height: 100%;
    padding: 0 15px;
    color: ${p => p.theme.colors.secondaryInverted};
    background: ${p => (p.isActive ? p.theme.colors.secondaryHighlight : p.theme.colors.secondary)};
    display: flex;
    align-items: center;
    font-size: ${p => p.theme.font.fontSizeSmall};

    &:hover {
        background: ${p => (p.selectionDisabled ? p.theme.colors.secondary : p.theme.colors.secondaryHighlight)};
    }

    &:active {
        background: ${p => (p.selectionDisabled ? p.theme.colors.secondary : p.theme.colors.secondaryHighlight)};
    }

    ${p =>
        p.fullWidth &&
        css`
            flex-grow: 1;
            justify-content: center;
        `}

    ${p =>
        p.isEditable &&
        css`
            padding: 0;
            flex-grow: 1;
        `}
`;

export class BarTab extends React.Component<HeaderBarTabProps> {
    render() {
        const { label, icon } = this.props;

        return (
            <BarTabElement {...this.props}>
                {icon && <FontAwesomeIcon icon={icon} size="lg" />}
                {label && label.toUpperCase()}
            </BarTabElement>
        );
    }
}
