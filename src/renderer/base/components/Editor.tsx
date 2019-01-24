import * as React from "react";
import { EditorState } from "base";
import { SheetEditorViewModel } from "../../viewModels/SheetEditorViewModel";
import { SheetEditor } from "../../sheetEditor/components/SheetEditor";
import { observer } from "mobx-react";

const styles = require("./editor.scss");

type EditorProps = {
    editorState: EditorState;
};

@observer
export class Editor extends React.Component<EditorProps> {
    render() {
        return <div className={styles.editor}>{this.renderActiveEditor()}</div>;
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