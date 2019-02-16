import React from "react";
import { Provider } from "mobx-react";
import classNames from "classnames";
import { EditorState } from "base";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContextProvider } from "react-dnd";

import { Editor } from "./base/components/Editor";
import { TopBar } from "./base/components/topbar/TopBar";
import { FileExplorer } from "./base/components/explorer/FileExplorer";

const editorState = new EditorState();

const styles = require("./App.scss");

type AppProps = {};

export class App extends React.Component<AppProps> {
    render() {
        return (
            <Provider editorState={editorState}>
                <DragDropContextProvider backend={HTML5Backend}>
                    <div className={classNames(styles.container)}>
                        <TopBar editorState={editorState} />
                        <div className={styles.content}>
                            <FileExplorer
                                viewModel={editorState.fileExplorerController.viewModel}
                                editorState={editorState}
                            />
                            <Editor editorState={editorState} />
                        </div>
                    </div>
                </DragDropContextProvider>
            </Provider>
        );
    }
}
