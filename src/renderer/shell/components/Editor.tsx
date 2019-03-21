import * as React from "react";
import { EditorState } from "shell";
import { SheetEditorViewModel } from "../../viewModels/SheetEditorViewModel";
import { SheetEditor } from "../../sheetEditor/components/SheetEditor";
import { observer } from "mobx-react";
import { styled } from "essentials";

type EditorProps = {
    editorState: EditorState;
};

const EditorElement = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
`;

@observer
export class Editor extends React.Component<EditorProps> {
    render() {
        return <EditorElement>{this.renderActiveEditor()}</EditorElement>;
    }

    private renderActiveEditor() {
        const { editorState } = this.props;

        const activeEditor = editorState.activeEditor;

        if (activeEditor instanceof SheetEditorViewModel) {
            return <SheetEditor viewModel={activeEditor} />;
        }

        return null;
    }
}
