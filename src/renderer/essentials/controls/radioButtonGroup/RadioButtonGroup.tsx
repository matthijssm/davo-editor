import * as React from "react";
import { ControlGroup } from "../ControlGroup";
import { ButtonProps } from "../Button";
import { observer } from "mobx-react";

export interface IRadioButtonProps {
    caption: string;
    value: string;
    disabled?: boolean;
    className?: string;
    selectedClassName?: string;
}

type Props = {
    label?: string;
    noLabelCapitalization?: boolean;
    className?: string;
    radioButtonGroup?: string;
    currentValue: string | null;
    description?: string;
    display?: "inline" | "block";
    readOnly?: boolean;
    onChange: (newValue: string) => void;
};

@observer
export class RadioButtonGroup extends React.Component<Props> {
    static defaultProps = {
        display: "block"
    };

    render() {
        return <ControlGroup>{React.Children.map(this.props.children, this.renderItem)}</ControlGroup>;
    }

    renderItem = (child: React.ReactChild) => {
        if (!React.isValidElement<HTMLButtonElement & ButtonProps>(child)) return;

        const value = child.props.value;
        const isSelected = this.props.currentValue === value;

        const onClick = () => {
            this.clickHandler(value);
        };

        return React.cloneElement(child, { fullWidth: false, active: isSelected, onClick: onClick });
    };

    clickHandler = (newValue: string) => {
        if (newValue !== this.props.currentValue) {
            this.props.onChange(newValue);
        }
    };
}
