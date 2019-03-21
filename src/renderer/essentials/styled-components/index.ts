import * as styledComponents from "styled-components";
import { DavoTheme } from "../themes/main";

const {
    default: styled,
    css,
    createGlobalStyle,
    keyframes,
    ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<DavoTheme>;

export { css, createGlobalStyle, keyframes, ThemeProvider, styled };
