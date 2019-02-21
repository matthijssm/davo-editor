import * as React from "react";
import { observer } from "mobx-react";

import { IChord } from "../../../model/IChord";
import { Key } from "../../../model/Key";
import { ChordDropzone } from "./ChordDropzone";
import { IChordBase } from "../../../model/IChordBase";
import { SheetEditorViewModel } from "../../../viewModels/SheetEditorViewModel";
import { DraggableChord } from "../properties/controls/DraggableChord";
import { MoveDirection } from "../../chords/ChordMover";

type ChordLyricPairProps = {
    lyrics?: string;
    chord?: IChord;
    baseKey?: Key;
    showChords: boolean;
    viewModel: SheetEditorViewModel;
    startPosition: number;
    onChordMove?: (chord: IChord, direction: MoveDirection) => void;
    onChange?: (newValue: string) => void;
    onChordDrop?: (position: number, chord: IChordBase) => void;
    onDeleteChord?: (chord: IChord) => void;
};

const styles = require("./ChordLyricPair.scss");

@observer
export class ChordLyricPair extends React.Component<ChordLyricPairProps> {
    render() {
        const { chord, lyrics, baseKey, showChords, startPosition, viewModel, onChordMove } = this.props;

        const isChordSelected = viewModel.selectedElement && chord && chord.id === viewModel.selectedElement.id;

        return (
            <span className={styles.pair}>
                {showChords && (
                    <span className={styles.chord}>
                        {chord && baseKey && (
                            <DraggableChord
                                isInline={true}
                                isSelected={isChordSelected}
                                chord={chord}
                                baseKey={baseKey}
                                onDragEndWithDrop={this.removeChord}
                                onClick={this.onChordClick}
                                onDelete={this.removeChord}
                                isEditable={true}
                                onMove={onChordMove}
                            />
                        )}
                    </span>
                )}
                <span className={styles.lyric}>{this.renderDropzones(lyrics, startPosition)}</span>
            </span>
        );
    }

    private onChordClick = () => {
        const { viewModel, chord } = this.props;

        viewModel.setSelectedElement(chord);
    };

    private renderDropzones(text: string, startPosition: number) {
        return [...text].map((character, index) => {
            const isDisabled = this.props.chord && index === 0;

            return (
                <ChordDropzone
                    key={index}
                    position={startPosition + index}
                    content={character}
                    onChordDrop={this.props.onChordDrop}
                    isDisabled={isDisabled}
                />
            );
        });
    }

    private removeChord = () => {
        const { chord, onDeleteChord } = this.props;

        return onDeleteChord && onDeleteChord(chord);
    };
}