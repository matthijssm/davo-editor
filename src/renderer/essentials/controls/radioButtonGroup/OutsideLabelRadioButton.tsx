import * as React from "react";
import { IRadioButtonProps } from "./RadioButtonGroup";

const styles = require("./RadioButtonGroup.scss");

type Props = IRadioButtonProps & {
    iconName: string;
};

export class OutsideLabelRadioButton extends React.Component<Props> {
    render() {
        return (
            <>
                <div className={styles.button}>
                    <div className={styles.icon} />
                </div>
                <div className={styles.label}>{this.props.caption}</div>
            </>
        );
    }
}
