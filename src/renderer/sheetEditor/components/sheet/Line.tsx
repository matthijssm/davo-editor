import * as React from "react";
import { ILine } from "./ILine";
import { observer, inject } from "mobx-react";
import { IElement } from "../../../model/IElement";
import classNames from "classnames";
import { SheetEditorViewModel } from "../../../viewModels/SheetEditorViewModel";
import { action } from "mobx";

type LineProps = {
    line: ILine;
    isActive: boolean;
    viewModel?: SheetEditorViewModel;
    onArrowUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onArrowDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onNewLine?: (value: string) => void;
    onRemove?: (value: string) => void;
    onFocus: (element: IElement) => void;
};

const styles = require("./Line.scss");

@inject("viewModel")
@observer
export class Line extends React.Component<LineProps> {
    private contentField = React.createRef<HTMLInputElement>();

    render() {
        const { line, isActive } = this.props;

        const className = classNames(styles.lineInput, {
            [styles.isActive]: isActive
        });

        return (
            <input
                type="text"
                ref={this.contentField}
                className={className}
                onKeyDown={this.onKeyDown}
                onChange={this.onChange}
                onBlur={this.onBlur}
                value={line.content}
                onFocus={this.onFocus}
            />
        );
    }

    private onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        const { onFocus, viewModel } = this.props;

        onFocus(this.props.line);
        viewModel.setCaretPosition(event.target.selectionStart);

        event.stopPropagation();
    };

    private onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        this.props.onFocus(null);
    };

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { line } = this.props;

        line.content = event.target.value;
        this.props.viewModel.setCaretPosition(this.contentField.current.selectionStart);
    };

    private onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.keyCode) {
            case 8:
            case 46:
                this.onBackspace(event);
                break;
            case 13:
                this.onEnter();
                break;
            case 38:
                this.moveUp(event);
                break;
            case 40:
                this.moveDown(event);
                break;
        }

        this.props.viewModel.setCaretPosition(this.contentField.current.selectionStart);
    };

    private moveUp(event: React.KeyboardEvent<HTMLInputElement>) {
        this.props.onArrowUp(event);
    }

    private moveDown(event: React.KeyboardEvent<HTMLInputElement>) {
        this.props.onArrowDown(event);
    }

    private onEnter = () => {
        const { onNewLine, line } = this.props;
        const { selectionStart } = this.contentField.current;
        const selection = this.getSelection();

        if (onNewLine) {
            line.content = line.content.replace(selection, "");
            if (this.hasSelection()) {
                onNewLine(selection);
            } else {
                if (selectionStart + 1 >= line.content.length) {
                    onNewLine(selection);
                }
            }
        }
    };

    private onBackspace = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { selectionStart, selectionEnd } = this.contentField.current;

        if (this.props.onRemove) {
            if (selectionStart === 0 && selectionEnd === 0) {
                this.props.onRemove(this.getSelection());
                event.preventDefault();
            }
        }
    };

    private getSelection = (): string => {
        const { selectionStart, selectionEnd } = this.contentField.current;

        const value = this.props.line.content;

        if (this.hasSelection()) {
            return value.slice(selectionStart, selectionEnd);
        }

        return value.slice(selectionStart, value.length);
    };

    private hasSelection = (): boolean => {
        const { selectionStart, selectionEnd } = this.contentField.current;

        return selectionStart !== selectionEnd;
    };

    private setFocusAndCaret() {
        if (this.props.isActive) {
            this.contentField.current.focus();
            this.contentField.current.selectionStart = this.props.viewModel.caretPosition;
            this.contentField.current.selectionEnd = this.props.viewModel.caretPosition;
        }
    }

    componentDidMount() {
        this.setFocusAndCaret();
    }

    componentDidUpdate() {
        this.setFocusAndCaret();
    }
}
