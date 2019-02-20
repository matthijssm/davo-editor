import * as React from "react";
import classNames from "classnames";
import {
    ConnectDragSource,
    DragSourceConnector,
    DragSourceMonitor,
    DragSourceSpec,
    DragSourceCollector,
    DragSource
} from "react-dnd";

import { IChordBase } from "../../../../model/IChordBase";
import { Key } from "../../../../model/Key";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { AlphabetToChordBaseTranslator } from "../../../chords/AlphabetToChordBaseTranslator";

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

const dragSourceCollector: DragSourceCollector<DragProps> = (
    connect: DragSourceConnector,
    monitor: DragSourceMonitor
) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

const styles = require("./DraggableChord.scss");

@observer
class DraggableChordClass extends React.Component<Props> {
    @observable private isEditing: boolean = false;

    @observable private inputValue: string;

    private inputField = React.createRef<HTMLInputElement>();

    render() {
        const { chord, baseKey, connectDragSource, isInline, onClick, isEditable } = this.props;

        const className = classNames(styles.chord, { [styles.isInline]: isInline });

        return connectDragSource(
            <div
                className={className}
                onClick={onClick}
                tabIndex={0}
                onKeyDown={this.onKeyDown}
                onDoubleClick={this.setIsEditing(true)}
            >
                {isEditable && this.isEditing ? (
                    <input
                        value={this.inputValue}
                        onChange={this.onChange}
                        type="text"
                        size={this.inputValue.length ? this.inputValue.length : 1}
                        className={styles.chordInput}
                        onFocus={this.onFocus}
                        onBlur={this.finishEditing}
                        ref={this.inputField}
                    />
                ) : (
                    chord.toAlphabethString(baseKey)
                )}
            </div>
        );
    }

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

    private onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.keyCode) {
            case 8:
            case 46:
                if (!this.isEditing) {
                    this.props.onDelete && !this.isEditing && this.props.onDelete();
                }
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

export const DraggableChord = DragSource<Props, DragProps, {}>("chord", draggableSourceSpec, dragSourceCollector)(
    DraggableChordClass
);
