import * as React from 'react';
import classNames from 'classNames';
import { createRef } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

type EditableHeaderBarTabProps = {
    value: string;
    onChange?: (e: React.ChangeEvent) => void;
    onBlur?: () => void;
    placeholder?: string;
    autofocus?: boolean;
};

const styles = require('./HeaderBarTab.scss');

const MIN_SIZE = 10;
const MAX_SIZE = 30;

@observer
export class EditableHeaderBarTab extends React.Component<
    EditableHeaderBarTabProps
> {
    private inputElement: React.RefObject<HTMLInputElement>;

    @observable
    private inputSize: number;

    constructor(props: EditableHeaderBarTabProps) {
        super(props);
        this.inputElement = createRef();
        this.inputSize = this.getInputSize(props.value);
    }

    render() {
        const { value, onBlur, placeholder } = this.props;

        return (
            <div className={classNames(styles.headerBarTab, styles.isEditable)}>
                <input
                    value={value}
                    onChange={this.onChange}
                    onBlur={onBlur}
                    className={styles.headerBarTabInput}
                    placeholder={placeholder}
                    ref={this.inputElement}
                    size={this.inputSize}
                />
            </div>
        );
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event);
    };

    @action
    private setInputSize = (value: string) => {
        this.inputSize = this.getInputSize(value);
    };

    private getInputSize(value: string): number {
        if (value.length >= MIN_SIZE && value.length <= MAX_SIZE) {
            return value.length;
        }

        if (value.length < MIN_SIZE) return MIN_SIZE;

        return MAX_SIZE;
    }

    componentDidMount = () => {
        if (this.props.autofocus) {
            this.inputElement.current.focus();
        }
    };

    componentDidUpdate() {
        this.setInputSize(this.props.value);
    }
}
