import * as React from "react";
import { observer, inject } from "mobx-react";
import { EditorState } from "shell";
import { styled } from "essentials";

import { ILine } from "../../../model/ILine";
import { IElement } from "../../../model/IElement";
import { SheetEditorViewModel } from "../../../viewModels/SheetEditorViewModel";
import { IChordBase } from "../../../model/IChordBase";
import { ChordLyricPair } from "./ChordLyricPair";
import { IChord } from "../../../model/IChord";
import { MoveDirection, ChordMover } from "../../chords/ChordMover";

type LineProps = {
    line: ILine;
    isActive: boolean;
    viewModel: SheetEditorViewModel;
    editorState?: EditorState;
    onArrowUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onArrowDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onNewLine?: (value: string) => void;
    onRemove?: (value: string) => void;
    onFocus: (element: IElement) => void;
    onPaste?: (content: string) => void;
};

const LineElement = styled.div`
    padding: 1px 0;
    margin: 0;
    display: flex;
    width: 100%;
    font-size: ${p => p.theme.font.fontSizeBody};
    color: black;
    position: relative;
    text-rendering: optimizeLegibility;
`;

const LineInput = styled.input`
    border: 0;
    width: 100%;
    padding: 5px 2px;
    outline: none;
    position: absolute;
    bottom: 0;
    left: 2px;
    font-size: ${p => p.theme.font.fontSizeBody};
    color: black;
    text-rendering: optimizeLegibility;
`;

@inject("editorState")
@observer
export class Line extends React.Component<LineProps> {
    private contentField = React.createRef<HTMLInputElement>();

    render() {
        const { line, editorState } = this.props;

        return (
            <LineElement>
                {this.renderChordLyricsPairs()}
                {!editorState.isDragging && (
                    <LineInput
                        type="text"
                        ref={this.contentField}
                        onKeyDown={this.onKeyDown}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        value={line.content}
                        onFocus={this.onFocus}
                        onPaste={this.onPaste}
                    />
                )}
            </LineElement>
        );
    }

    private renderChordLyricsPairs() {
        const { viewModel, line } = this.props;

        const pairProps = {
            onDeleteChord: this.onDeleteChord,
            onChordDrop: this.onChordDrop,
            viewModel: viewModel,
            showChords: line.hasChords,
            onChordMove: this.onChordMove
        };

        if (line.chords.length) {
            // Sort the chords in the correct order of position.
            const sortedChords = [...line.chords].sort((a, b) => a.position - b.position || a.order - b.order);

            const chordLyricPairs = [];

            // Create the start of the sentence.
            if (sortedChords[0].position > 0) {
                const lyrics = line.displayContent.substring(0, sortedChords[0].position);
                chordLyricPairs.push(<ChordLyricPair key={0} lyrics={lyrics} startPosition={0} {...pairProps} />);
            }

            sortedChords.forEach((chord, index, chords) => {
                const nextPosition = chords[index + 1] ? chords[index + 1].position : line.displayContent.length;
                const lyrics = line.displayContent.substring(chord.position, nextPosition);

                chordLyricPairs.push(<ChordLyricPair key={chord.id} chord={chord} baseKey={viewModel.key} lyrics={lyrics} startPosition={chord.position} {...pairProps} />);
            });

            return chordLyricPairs;
        } else {
            return <ChordLyricPair lyrics={line.displayContent} startPosition={0} {...pairProps} />;
        }
    }

    private onDeleteChord = (chord: IChord) => {
        const { line } = this.props;

        line.removeChord(chord);
    };

    private onChordMove = (chord: IChord, direction: MoveDirection) => {
        ChordMover.move(chord, this.props.line, direction);
    };

    private onChordDrop = (position: number, chord: IChordBase) => {
        const { line } = this.props;

        line.addChord(chord, position);
    };

    private onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = event.clipboardData.getData("text/plain");

        if (pasteData.match(/\n/g)) {
            event.preventDefault();
        }
    };

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
