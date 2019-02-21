import { IChord } from "../../model/IChord";
import { ILine } from "../../model/ILine";

export enum MoveDirection {
    Right,
    Left
}

export namespace ChordMover {
    export function move(chord: IChord, line: ILine, direction: MoveDirection) {
        const chordsOnCurrentPosition = line.chords
            .filter(c => c.position === chord.position)
            .sort((a, b) => a.order - b.order);

        if (chordsOnCurrentPosition.length > 1) {
            if (direction === MoveDirection.Left) {
                if (chord.order > 0) {
                    swapChordOrders(chordsOnCurrentPosition, chord, direction);
                } else {
                    movePosition(chord, line, direction);
                    updateOrderOnPosition(line, chord.position + 1);
                }
            } else {
                if (chord.order === [...chordsOnCurrentPosition].pop().order) {
                    movePosition(chord, line, direction);
                    updateOrderOnPosition(line, chord.position - 1);
                } else {
                    swapChordOrders(chordsOnCurrentPosition, chord, direction);
                }
            }
        } else {
            movePosition(chord, line, direction);
        }
    }

    function swapChordOrders(chordsOnCurrentPosition: IChord[], chord: IChord, direction: MoveDirection) {
        const newPosition = direction === MoveDirection.Left ? chord.order - 1 : chord.order + 1;

        const chordToSwap = chordsOnCurrentPosition.find(c => c.order === newPosition);

        chordToSwap.order = chord.order;
        chord.order = newPosition;
    }

    function updateOrderOnPosition(line: ILine, position: number) {
        line.chords
            .filter(chord => chord.position === position)
            .sort((a, b) => a.order - b.order)
            .forEach((chord, index) => {
                chord.order = index;
            });
    }

    function movePosition(chord: IChord, line: ILine, direction: MoveDirection) {
        // We need to move the position.
        const newPosition = getNewPosition(chord.position, direction);

        const chordsOnNewPosition = line.chords.filter(searchChord => searchChord.position === newPosition);

        chord.order = 0;

        if (chordsOnNewPosition.length) {
            // There are other chords with the same position so update the order of the chords.
            if (direction === MoveDirection.Left) {
                chord.order = [...chordsOnNewPosition].pop().order + 1;
            } else {
                chord.order = 0;

                chordsOnNewPosition.forEach(c => {
                    c.order = c.order + 1;
                });
            }
        }

        setNewPosition(chord, newPosition, line);
    }

    function setNewPosition(chord: IChord, newPosition: number, line: ILine) {
        if (newPosition >= 0 && newPosition < line.displayContent.length) {
            chord.position = newPosition;
        }
    }

    function getNewPosition(position: number, direction: MoveDirection): number {
        if (direction === MoveDirection.Left) {
            return position - 1;
        } else {
            return position + 1;
        }
    }
}
