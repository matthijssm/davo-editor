import * as React from "react";
import { ConnectDragSource, DragSourceConnector, DragSourceMonitor, DragSourceSpec, DragSourceCollector, DragSource } from "react-dnd";
import { styled, css } from "essentials";

import { IChordBase } from "../../../../model/IChordBase";
import { Key } from "../../../../model/Key";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { AlphabetToChordBaseTranslator } from "../../../chords/AlphabetToChordBaseTranslator";
import { MoveDirection } from "../../../chords/ChordMover";
import { IChord } from "../../../../model/IChord";
import { Chord as ChordModel } from "../../../../model/Chord";

interface DraggableChordProps {
    chord: IChordBase;
    baseKey: Key;
    isInline?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    isEditable?: boolean;
    onClick?: () => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
    onDragEndWithDrop?: () => void;
    onDelete?: () => void;
    onMove?: (chord: IChord, direction: MoveDirection) => void;
}

interface DragProps {
    connectDragSource?: ConnectDragSource;
    isDragging?: boolean;
}

export type ChordDndValue = {
    chord: IChordBase;
};

type Props = DraggableChordProps & DragProps;

const draggableSourceSpec: DragSourceSpec<DraggableChordProps, ChordDndValue> = {
    canDrag(props: DraggableChordProps) {
        return !props.isDisabled;
    },

    beginDrag(props: DraggableChordProps) {
        if (props.onDragStart) {
            props.onDragStart();
        }
        return { chord: props.chord };
    },

    endDrag(props: DraggableChordProps, monitor: DragSourceMonitor) {
        if (monitor.didDrop() && props.onDragEndWithDrop) {
            props.onDragEndWithDrop();
        }
        if (props.onDragEnd) {
            props.onDragEnd();
        }
    }
};

const dragSourceCollector: DragSourceCollector<DragProps> = (connect: DragSourceConnector, monitor: DragSourceMonitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

const Chord = styled.div<{ inline?: boolean; selected?: boolean }>`
    padding: 4px 5px;
    background: ${p => p.theme.colors.baseHighlight};
    font-size: ${p => p.theme.font.fontSizeSmall};
    font-weight: bold;
    color: ${p => p.theme.colors.baseInverted};
    border-radius: 3px;
    display: inline-flex;
    margin: 5px 3px;
    user-select: none;
    outline: none;
    z-index: 10;
    position: relative;

    &:first-of-type {
        margin-left: 0;
    }

    &:last-of-type {
        margin-right: 0;
    }

    &:hover {
        background: ${p => p.theme.colors.baseHighlight};
        cursor: pointer;
    }

    ${p =>
        p.inline &&
        css`
            padding: 0px 1px;
            line-height: normal;
            margin: 0;
            border: 1px solid lighten($border-color, $lighten-amount);
            font-size: ${p.theme.font.fontSizeBody};
            background: ${p.theme.colors.base};
        `}

    ${p =>
        p.selected &&
        css`
            border: 1px solid ${p.theme.colors.attention};
            background: ${p.theme.colors.baseHighlight};
            margin: -1px -1px;
        `}
`;

const InlineInput = styled.input`
    all: unset;
    size: unset;
    text-align: center;
`;

@observer
class DraggableChordClass extends React.Component<Props> {
    @observable private isEditing: boolean = false;

    @observable private inputValue: string;

    private inputField = React.createRef<HTMLInputElement>();

    render() {
        const { chord, baseKey, isInline, onClick, isEditable, isSelected } = this.props;

        return (
            <Chord ref={this.connectRef} inline={isInline} selected={isSelected} onClick={onClick} tabIndex={0} onKeyDown={this.onKeyDown} onDoubleClick={this.setIsEditing(true)}>
                {isEditable && this.isEditing ? (
                    <InlineInput
                        value={this.inputValue}
                        onChange={this.onChange}
                        type="text"
                        size={this.inputValue.length ? this.inputValue.length : 1}
                        onFocus={this.onFocus}
                        onBlur={this.finishEditing}
                        ref={this.inputField}
                    />
                ) : (
                    chord.toAlphabethString(baseKey)
                )}
            </Chord>
        );
    }

    private connectRef = (instance: HTMLDivElement) => {
        this.props.connectDragSource(instance);
    };

    @action
    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.inputValue = event.target.value;
    };

    private onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        this.inputField.current.select();
    };

    private finishEditing = () => {
        const { chord, baseKey } = this.props;

        const chordString = this.inputField.current.value;
        const parsedChord = AlphabetToChordBaseTranslator.translate(chordString, baseKey);

        if (parsedChord) {
            chord.updateChord(parsedChord);
        }

        this.inputValue = chord.toAlphabethString(baseKey);
        this.setIsEditing(false)();
    };

    private setIsEditing = (newValue: boolean) => {
        return () => {
            this.isEditing = newValue;
        };
    };

    private onMove = (direction: MoveDirection) => {
        if (this.isEditing) {
            return;
        }

        const { onMove, chord } = this.props;

        if (chord instanceof ChordModel && onMove) {
            onMove(chord, direction);
        }
    };

    private onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.keyCode) {
            case 8:
            case 46:
                if (!this.isEditing) {
                    this.props.onDelete && !this.isEditing && this.props.onDelete();
                }
                break;
            case 37:
                this.onMove(MoveDirection.Left);
                break;
            case 39:
                this.onMove(MoveDirection.Right);
                break;
            case 13:
                this.finishEditing();
                break;
        }
    };

    componentWillMount() {
        this.inputValue = this.props.chord.toAlphabethString(this.props.baseKey);
    }

    componentDidUpdate() {
        if (this.isEditing) {
            this.inputField.current.focus();
        }
    }
}

export const DraggableChord = DragSource<Props, DragProps, {}>("chord", draggableSourceSpec, dragSourceCollector)(DraggableChordClass);
