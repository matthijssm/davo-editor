import * as React from 'react';
import { EditorState } from './EditorState';
import { SheetEditorViewModel } from '../viewModels/SheetEditorViewModel';
import { SheetEditor } from './sheetEditor/SheetEditor';

const styles = require('./editor.scss');

type EditorProps = {
    editorState: EditorState;
};

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
