import * as React from "react";
import { DropTarget, ConnectDropTarget, DropTargetMonitor, DropTargetSpec, DropTargetCollector } from "react-dnd";
import classNames from "classnames";
import { styled, css } from "essentials";

import { IChordBase } from "../../../model/IChordBase";
import { IChord } from "../../../model/IChord";

type ChordDropperProps = {
    content: string;
    position: number;
    chord?: IChord;
    isDisabled?: boolean;
    fullHeight?: boolean;
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

type Props = ChordDropperProps & DropTargetProps;

const Dropzone = styled("span")<DropTargetProps>`
    box-sizing: border-box;
    white-space: pre;
    position: relative;

    ${p =>
        p.canDrop &&
        css`
            background: ${p.theme.colors.attention};
        `}
`;

const ExtendDropzone = styled.div`
    width: 100%;
    height: 36px;
    position: absolute;
    bottom: 0;
    left: 0;
`;

export class ChordDropzoneClass extends React.Component<Props> {
    render() {
        const { content, isOver, canDrop, connectDropTarget, fullHeight } = this.props;

        return connectDropTarget(
            <span>
                <Dropzone canDrop={isOver && canDrop}>
                    {fullHeight && <ExtendDropzone />}
                    {content}
                </Dropzone>
            </span>
        );
    }
}

export const ChordDropzone = DropTarget(["chord"], draggableTargetSpec, dropTargetCollector)(ChordDropzoneClass);
