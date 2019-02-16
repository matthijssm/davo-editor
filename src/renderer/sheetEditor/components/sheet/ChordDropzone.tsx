import * as React from "react";
import { DropTarget, ConnectDropTarget, DropTargetMonitor, DropTargetSpec, DropTargetCollector } from "react-dnd";
import classNames from "classnames";

import { IChordBase } from "../../../model/IChordBase";
import { IChord } from "../../../model/IChord";

type ChordDropperProps = {
    content: string;
    position: number;
    chord?: IChord;
    isDisabled?: boolean;
    onChordDrop?: (position: number, chord: IChordBase) => void;
};

type DropTargetProps = {
    canDrop?: boolean;
    isOver?: boolean;
    connectDropTarget?: ConnectDropTarget;
};

const draggableTargetSpec: DropTargetSpec<ChordDropperProps> = {
    drop(props: ChordDropperProps, monitor: DropTargetMonitor) {
        props.onChordDrop(props.position, monitor.getItem().chord);
    },

    canDrop(props: ChordDropperProps) {
        return !props.isDisabled;
    }
};

const dropTargetCollector: DropTargetCollector<DropTargetProps> = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
});

const styles = require("./ChordDropzone.scss");

type Props = ChordDropperProps & DropTargetProps;

export class ChordDropzoneClass extends React.Component<Props> {
    render() {
        const { content, isOver, canDrop, connectDropTarget } = this.props;

        const className = classNames(styles.dropzone, {
            [styles.canDrop]: isOver && canDrop
        });

        return connectDropTarget(<span className={className}>{content}</span>);
    }
}

export const ChordDropzone = DropTarget(["chord"], draggableTargetSpec, dropTargetCollector)(ChordDropzoneClass);
