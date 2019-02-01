import * as React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SectionOptionButtonProps = {
    icon: IconDefinition;
    onClick?: () => void;
};

const styles = require("./Section.scss");

export class SectionOptionButton extends React.Component<SectionOptionButtonProps> {
    render() {
        return (
            <div className={styles.button} onClick={this.props.onClick}>
                <FontAwesomeIcon icon={this.props.icon} />
            </div>
        );
    }
}
