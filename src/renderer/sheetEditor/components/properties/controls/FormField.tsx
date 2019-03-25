import * as React from "react";
import { styled } from "essentials";

import { Label } from "../../utils/Label";

type FormFieldProps = {
    label?: string;
};

const Field = styled.div`
    width: 100%;
    margin-bottom: 15px;
`;

const FieldContent = styled.div`
    margin-top: 7px;
`;

export class FormField extends React.Component<FormFieldProps> {
    render() {
        const { label, children } = this.props;

        return (
            <Field>
                {label && <Label>{label}</Label>}
                <FieldContent>{children}</FieldContent>
            </Field>
        );
    }
}
