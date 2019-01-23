import * as React from "react";

import { IRadioButtonProps } from "./RadioButtonGroup";

export class CustomRadioButton extends React.Component<IRadioButtonProps> {
    render() {
        return this.props.children;
    }
}
