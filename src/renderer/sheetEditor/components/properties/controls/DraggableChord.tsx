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

interface DraggableChordProps {
    chord: IChordBase;
    baseKey: Key;
    isInline?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    onClick?: () => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
    onDragEndWithDrop?: () => void;
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
    render() {
        const { chord, baseKey, connectDragSource, isInline, onClick, isSelected } = this.props;

        const className = classNames(styles.chord, { [styles.isInline]: isInline, [styles.isSelected]: isSelected });

        return connectDragSource(
            <div className={className} onClick={onClick}>
                {chord.toAlphabethString(baseKey)}
            </div>
        );
    }
}

export const DraggableChord = DragSource<Props, DragProps, {}>("chord", draggableSourceSpec, dragSourceCollector)(
    DraggableChordClass
);
