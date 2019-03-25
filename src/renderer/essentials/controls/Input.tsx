import { styled } from "../styled-components";

export const Input = styled.input`
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;

    display: block;
    background-color: ${p => p.theme.colors.base};
    width: 100%;
    padding: 9px;
    border: 1px solid ${p => p.theme.colors.baseHighlight};
    border-radius: $border-radius;
    font-size: ${p => p.theme.font.fontSizeSmall};
    outline: none;

    &:hover {
        border-color: ${p => p.theme.colors.attention};
        box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.08);
    }

    &:focus {
        border-color: ${p => p.theme.colors.attention};
    }
`;
