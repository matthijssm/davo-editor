import * as React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "essentials";

type SectionOptionButtonProps = {
    icon: IconDefinition;
    onClick?: () => void;
};

const Options = styled.div`
    display: block;
    border: 1px solid ${p => p.theme.colors.baseHighlight};
    border-radius: 0 0 0 3px;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 0;
    border-top: 0;
    background: ${p => p.theme.colors.base};

    &:not(:first-of-type) {
        border-radius: 0;
    }

    &:hover {
        background: ${p => p.theme.colors.baseHighlight};
    }
`;

export class SectionOptionButton extends React.Component<SectionOptionButtonProps> {
    render() {
        return (
            <Options onClick={this.props.onClick}>
                <FontAwesomeIcon icon={this.props.icon} />
            </Options>
        );
    }
}
