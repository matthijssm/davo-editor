import * as React from "react";

type FormGroupProps = {};

const styles = require("./FormGroup.scss");

export class FormGroup extends React.Component<FormGroupProps> {
    render() {
        return (
            <div className={styles.formGroup}>
                {React.Children.map(this.props.children, this.renderChild)}
            </div>
        );
    }

    private renderChild(child: React.ReactChild): React.ReactNode {
        return <div className={styles.groupItem}>{child}</div>;
    }
}
