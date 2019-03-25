import * as React from "react";
import { styled } from "../styled-components";
import { Input } from "./Input";
import { Button } from "./Button";

const Group = styled.div`
    width: 100%;
    display: flex;

    input,
    button {
        border-radius: 0px;
        text-align: center;
        border-right: 0;
        flex: 1;
    }

    input:first-child,
    button:first-child {
        border-radius: 3px 0 0 3px;
    }

    input:last-child,
    button:last-child {
        border-radius: 0 3px 3px 0;
        border-right: 1px solid ${p => p.theme.colors.baseHighlight};
    }

    button:hover,
    button:focus,
    input:hover,
    input:focus {
        border-color: ${p => p.theme.colors.attention};

        & + button,
        & + input {
            border-left: 1px solid ${p => p.theme.colors.attention};
        }
    }
`;

export class ControlGroup extends React.Component {
    render() {
        return <Group>{React.Children.map(this.props.children, this.renderChild)}</Group>;
    }

    private renderChild(child: React.ReactChild): React.ReactNode {
        return child;
    }
}
