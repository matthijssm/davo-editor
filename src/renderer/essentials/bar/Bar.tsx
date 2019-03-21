import { styled, css } from "../styled-components";

export const Bar = styled.div`
    width: 100%;
    height: 40px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    box-sizing: border-box;

    background: ${p => p.theme.colors.secondary};
    -webkit-user-select: none;

    color: $header-bar-color;
`;

type GroupProps = {
    align: string;
};

export const Group = styled("div")`
    display: flex;
    flex-direction: row;

    ${(p: GroupProps) =>
        p.align === "left" &&
        css`
            margin-right: auto;
        `};

    ${(p: GroupProps) =>
        p.align === "center" &&
        css`
            margin: 0 auto;
        `};

    ${(p: GroupProps) =>
        p.align === "right" &&
        css`
            margin-left: auto;
        `};
`;
