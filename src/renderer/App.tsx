import React from "react";
import { Provider } from "mobx-react";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContextProvider } from "react-dnd";
import { styled, theme, createGlobalStyle, ThemeProvider } from "essentials";

import { Editor } from "./shell/components/Editor";
import { TopBar } from "./shell/components/topbar/TopBar";
import { FileExplorer } from "./shell/components/explorer/FileExplorer";
import { EditorState } from "./shell";

const editorState = new EditorState();

const GlobalStyle = createGlobalStyle`
    body,
    input,
    textarea {
        font-family: ${props => props.theme.font.fontFamily};
        font-size: ${props => props.theme.font.fontSizeBody};
        color:  ${props => props.theme.colors.baseInverted}
    }

    html {
        box-sizing: border-box;
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }
`;

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: $gray;
    height: 100%;
`;

const AppContent = styled.div`
    width: 100%;
    flex: 2;
    display: flex;
    flex-direction: row;
`;

type AppProps = {};

export class App extends React.Component<AppProps> {
    render() {
        return (
            <Provider editorState={editorState}>
                <ThemeProvider theme={theme}>
                    <>
                        <GlobalStyle />
                        <DragDropContextProvider backend={HTML5Backend}>
                            <AppContainer>
                                <TopBar editorState={editorState} />
                                <AppContent>
                                    <FileExplorer viewModel={editorState.fileExplorerController.viewModel} editorState={editorState} />
                                    <Editor editorState={editorState} />
                                </AppContent>
                            </AppContainer>
                        </DragDropContextProvider>
                    </>
                </ThemeProvider>
            </Provider>
        );
    }
}
