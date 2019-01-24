import * as React from "react";

type FormFieldProps = {
    label?: string;
};

const styles = require("./FormField.scss");

export class FormField extends React.Component<FormFieldProps> {
    render() {
        const { label, children } = this.props;

        return (
            <div className={styles.formField}>
                {label && <div className={styles.label}>{label}</div>}
                <div className={styles.control}>{children}</div>
            </div>
        );
    }
}
