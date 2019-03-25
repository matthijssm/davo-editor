import { styled, css } from "../styled-components";

export type ButtonProps = {
    fullWidth?: boolean;
    active?: boolean;
    value?: string;
    onClick?: () => void;
};

export const Button = styled("button")<ButtonProps>`
    all: unset;

    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
    padding: 9px;
    border: 1px solid ${p => p.theme.colors.baseHighlight};
    box-sizing: border-box;
    font-weight: bold;
    border-radius: 3px;
    font-size: ${p => p.theme.font.fontSizeSmall};

    ${p =>
        p.fullWidth &&
        css`
            width: 100%;
            text-align: center;
        `}

    &:hover {
        border-color: ${p => p.theme.colors.attention};
    }

    &:active {
        color: ${p => p.theme.colors.attention};
    }

    ${p =>
        p.active &&
        css`
            color: ${p.theme.colors.attention};
            border-color: ${p.theme.colors.attention} !important;

            & + button {
                border-left: 1px solid ${p.theme.colors.attention};
            }
        `}
`;
