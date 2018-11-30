import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { observable } from 'mobx';
import { Provider } from 'mobx-react';

// Import the styles here to process them with webpack
import './resources/sass/main.scss';
import { TopBar } from './components/topbar/TopBar';
import { EditorState } from './components/EditorState';
import { FileExplorer } from './components/explorer/FileExplorer';

const editorState = new EditorState();

ReactDOM.render(
    <Provider editorState={editorState}>
        <div
            style={{
                width: '100%',
                height: '100%',
            }}>
            <TopBar editorState={editorState} />
            <FileExplorer
                viewModel={editorState.fileExplorerController.viewModel}
            />
        </div>
    </Provider>,
    document.getElementById('app')
);
