import { IChord } from "../../model/IChord";
import { ILine } from "../../model/ILine";
import { action } from "mobx";

export enum MoveDirection {
    Right,
    Left
}

export namespace ChordMover {
    export function move(chord: IChord, line: ILine, direction: MoveDirection) {
        const positions = line.chords.map(mapChord => mapChord.position);

        const newPosition = getNewPosition(chord.position, direction);

        if (positions.indexOf(newPosition) > -1) {
            const chordToSwap = line.chords.find(searchChord => searchChord.position === newPosition);
            setNewPosition(chordToSwap, chord.position, line);
            setNewPosition(chord, newPosition, line);
        } else {
            setNewPosition(chord, newPosition, line);
        }
    }

    function setNewPosition(chord: IChord, newPosition: number, line: ILine) {
        if (line.chords.length >= line.content.length) {
            if (newPosition >= 0 && newPosition < line.chords.length) {
                chord.position = newPosition;
            }
        } else {
            if (newPosition >= 0 && newPosition <= line.content.length) {
                chord.position = newPosition;
            }
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
