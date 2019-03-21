import React from "react";
import { observer } from "mobx-react";
import { EditorState } from "shell";
import ReactDOM from "react-dom";
import { faThList, faCogs } from "@fortawesome/pro-light-svg-icons";

import { TopBarTab } from "./TopBarTab";
import { SheetEditorViewModel } from "../../../viewModels/SheetEditorViewModel";
import { ITabbedEditor } from "../../../controls/ITabbedEditor";
import styled from "styled-components";

type TopBarProps = {
    editorState: EditorState;
};

const StyledTopBar = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 80px;

    font-size: ${props => props.theme.font.fontSizeSmall};
    background: ${props => props.theme.colors.primary};
    -webkit-app-region: drag;
    -webkit-user-select: none;
`;

const ScrollableTabsContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-x: auto;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
        height: 0px;
    }
`;

@observer
export class TopBar extends React.Component<TopBarProps> {
    private horizontalScrollElement = React.createRef<HTMLDivElement>();

    private tabElements: TopBarTab[] = [];

    constructor(props: TopBarProps) {
        super(props);
        this.horizontalScrollElement = React.createRef();
    }

    render() {
        return (
            <StyledTopBar>
                <TopBarTab active={true} icon={faThList} />
                {/* <TopBarTab active={false} icon={faCogs} /> */}

                <ScrollableTabsContainer ref={this.horizontalScrollElement}>
                    {this.renderOpenTabs()}
                </ScrollableTabsContainer>
            </StyledTopBar>
        );
    }

    private renderOpenTabs() {
        const { editorState } = this.props;

        const editors = editorState.openEditors;

        return editors.map((editorViewModel: SheetEditorViewModel, index: number) => {
            const isActive = editorState.activeEditor ? editorViewModel.id === editorState.activeEditor.id : false;

            return (
                <TopBarTab
                    active={isActive}
                    label={editorViewModel.label}
                    loading={editorViewModel.isLoading}
                    closable={!editorViewModel.isUnsaved}
                    key={editorViewModel.id}
                    unsaved={editorViewModel.isUnsaved}
                    onClick={this.onClick(editorViewModel)}
                    onClose={this.onClose(editorViewModel)}
                    ref={ref => (ref !== null ? (this.tabElements[index] = ref) : undefined)}
                />
            );
        });
    }

    private onClick = (editor: ITabbedEditor) => {
        return () => {
            this.props.editorState.openEditor(editor.document);
        };
    };

    private scrollActiveTabIntoView() {
        const activeTab = this.tabElements.find(tab => tab.props.active);

        if (activeTab) {
            const node = ReactDOM.findDOMNode(activeTab);

            if (node instanceof HTMLElement) {
                const { scrollWidth, offsetLeft } = node;
                const container = this.horizontalScrollElement.current;

                if (!this.elementIsVisibleInContainer(node)) {
                    if (offsetLeft + scrollWidth > container.clientWidth + container.scrollLeft) {
                        container.scrollLeft = offsetLeft - container.clientWidth + scrollWidth;
                    } else {
                        container.scrollLeft = offsetLeft;
                    }
                }
            }
        }
    }

    private elementIsVisibleInContainer(tabElement: HTMLElement) {
        const container = this.horizontalScrollElement.current;
        const { scrollWidth, offsetLeft } = tabElement;

        return (
            offsetLeft >= container.scrollLeft &&
            offsetLeft + scrollWidth <= container.clientWidth + container.scrollLeft
        );
    }

    private onClose = (editor: ITabbedEditor) => {
        return () => {
            this.props.editorState.closeEditor(editor);
        };
    };

    componentWillUpdate() {
        this.tabElements = [];
    }

    componentDidUpdate() {
        this.scrollActiveTabIntoView();
    }
}
