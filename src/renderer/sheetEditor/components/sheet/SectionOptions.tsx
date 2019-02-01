import * as React from "react";

type SectionOptionsProps = {};

const styles = require("./Section.scss");

export class SectionOptions extends React.Component<SectionOptionsProps> {
    render() {
        return <div className={styles.options}>{this.props.children}</div>;
    }
}
