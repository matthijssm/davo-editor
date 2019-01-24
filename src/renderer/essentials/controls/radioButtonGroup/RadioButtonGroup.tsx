import * as classNames from "classnames";
import * as React from "react";

const styles = require("./RadioButtonGroup.scss");

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

/**
 * Radio buttons groups have the functionality of radiobuttons but are displayed
 * as list of buttons (from which one can be selected)
 * Children should be `RadioButtonGroupButton` instances
 *
 * Use it like:
 * @example
 * <RadioButtonGroup currentValue="first" onChange={ newValue => { bla }}>
 *     <RadioButtonGroupButton caption="hi" value="first" />
 *     <RadioButtonGroupButton caption="boe" value="second" />
 * </RadioButtonGroup>
 *
 */
export class RadioButtonGroup extends React.Component<Props> {
    static defaultProps = {
        display: "block"
    };

    render() {
        return (
            <div
                className={classNames(styles.group, this.props.radioButtonGroup, {
                    [styles.full_width]: this.props.display === "block"
                })}
            >
                {React.Children.map(this.props.children, this.renderItem)}
            </div>
        );
    }

    renderItem = (child: React.ReactChild) => {
        if (!React.isValidElement<IRadioButtonProps>(child)) {
            return child;
        }

        const value = child.props.value;
        const isSelected = this.props.currentValue === value;
        const isDisabled = child.props.disabled || this.props.readOnly;

        const className = classNames(styles.item, child.props.className, {
            [styles.selected]: isSelected,
            [child.props.selectedClassName || ""]: isSelected,
            [styles.disabled]: isDisabled
        });

        const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (isDisabled) {
                return;
            }

            this.clickHandler(value);
        };

        return (
            <div className={className} onClick={onClick}>
                {child}
            </div>
        );
    };

    clickHandler = (newValue: string) => {
        // onChange handler is responsible for providing a new currentValue to this component!
        if (newValue !== this.props.currentValue) {
            this.props.onChange(newValue);
        }
    };
}
