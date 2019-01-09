import React from 'react';
import { Provider } from 'mobx-react';
import { EditorState } from './components/EditorState';
import { TopBar } from './components/topbar/TopBar';
import { FileExplorer } from './components/explorer/FileExplorer';
import { Editor } from './components/Editor';

const editorState = new EditorState();

const styles = require('./App.scss');

type AppProps = {};

export class App extends React.Component<AppProps> {
    render() {
        return (
            <Provider editorState={editorState}>
                <div className="container">
                    <TopBar editorState={editorState} />
                    <div className="content">
                        <FileExplorer
                            viewModel={
                                editorState.fileExplorerController.viewModel
                            }
                            editorState={editorState}
                        />
                        <Editor editorState={editorState} />
                    </div>
                </div>
            </Provider>
        );
    }
}
