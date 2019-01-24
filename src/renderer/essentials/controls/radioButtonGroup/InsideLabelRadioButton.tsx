import * as classNames from "classnames";
import * as React from "react";

import { IRadioButtonProps } from "./RadioButtonGroup";

const styles = require("./RadioButtonGroup.scss");

type Props = IRadioButtonProps & {
    iconName?: string;
};

export class InsideLabelRadioButton extends React.Component<Props> {
    render() {
        return (
            <div className={styles.button}>
                {this.props.iconName && <div className={classNames(styles.icon)} />}
                <div className={styles.label}>{this.props.caption}</div>
            </div>
        );
    }
}
