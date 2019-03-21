import * as React from "react";
import { inject } from "mobx-react";

import { SheetEditorViewModel } from "../../../viewModels/SheetEditorViewModel";
import { FormField } from "./controls/FormField";
import { ChordMapCreator } from "../../chords/ChordMapCreator";
import { DraggableChord } from "./controls/DraggableChord";
import { EditorState } from "shell";
import { action } from "mobx";

type SheetPaneProps = {
    viewModel: SheetEditorViewModel;
    editorState?: EditorState;
};

@inject("editorState")
export class SheetPane extends React.Component<SheetPaneProps> {
    render() {
        return <FormField label="Chords From Key">{this.renderChords()}</FormField>;
    }

    private renderChords(): React.ReactNode {
        const chords = ChordMapCreator.createMap(this.props.viewModel.key);

        return chords.map((chord, index) => {
            return (
                <DraggableChord
                    key={index}
                    baseKey={this.props.viewModel.key}
                    chord={chord}
                    onDragStart={this.onDragStart}
                    onDragEnd={this.onDragEnd}
                />
            );
        });
    }

    @action
    private onDragStart = () => {
        this.props.editorState.isDragging = true;
    };

    @action
    private onDragEnd = () => {
        this.props.editorState.isDragging = false;
    };
}
