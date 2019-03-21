import { lighten, darken } from "polished";

export interface DavoTheme {
    colors: any;
    font: any;
    utils: any;
}

/**
 * Davo color system:
 * - The main color (no suffix)
 * - The highlight that can be used for hover effects (Highlight suffix)
 * - The inverted that can be used for text on the main color (Inverse suffix)
 */

const LIGHTEN = 0.04;
const DARKEN = 0.3;

const hardColors = {
    grey1: "#222222",
    grey2: lighten(LIGHTEN, "#222222"),
    grey3: "#f8f8f8",
    white: "#ffffff",
    orchid: "#BB80CF"
};

const colors: any = {
    // Primary colors
    primary: hardColors.grey1,
    primaryHighlight: hardColors.grey2,
    primaryInverted: hardColors.white,
    primaryFaded: darken(DARKEN, hardColors.white),

    // Secondary colors
    secondary: hardColors.grey2,
    secondaryHighlight: hardColors.grey1,
    secondaryInverted: hardColors.white,
    secondaryFaded: darken(DARKEN, hardColors.white),

    // Tertiary colors
    tertiary: hardColors.grey3,
    tertiaryHighlight: darken(0.1, hardColors.grey3),
    tertiaryInverted: hardColors.grey2,
    tertiaryFaded: lighten(0.3, hardColors.grey2),

    attention: hardColors.orchid,
    attentionHighlight: lighten(0.08, hardColors.orchid),
    attentionInverted: hardColors.white,
    attentionFaded: darken(0.1, hardColors.white),

    // Base colors
    base: hardColors.white,
    baseHighlight: darken(0.1, hardColors.grey3),
    baseInverted: hardColors.grey1
};

const fonts = {
    fontFamily: "Roboto, sans-serif",
    fontSizeBody: "13px",
    fontSizeSmall: "11px",
    fontSizeHeader: "16px"
};

const utils = {
    borderRadius: "3px"
};

export const theme: DavoTheme = {
    colors: colors,
    font: fonts,
    utils: utils
};
