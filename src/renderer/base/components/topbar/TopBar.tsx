import React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import { EditorState } from "base";
import ReactDOM from "react-dom";
import { faThList, faCogs } from "@fortawesome/pro-light-svg-icons";

import { WindowButtons } from "./window/WindowButtons";
import { TopBarTab } from "./TopBarTab";
import { SheetEditorViewModel } from "../../../viewModels/SheetEditorViewModel";
import { ITabbedEditor } from "../../../controls/ITabbedEditor";

type TopBarProps = {
    editorState: EditorState;
};

const styles = require("./TopBar.scss");

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
            <div className={classNames(styles.topBar)}>
                <WindowButtons window={this.props.editorState.browserWindow} />

                <TopBarTab active={true} icon={faThList} />
                <TopBarTab active={false} icon={faCogs} />

                <div className={styles.horizontalScrollable} ref={this.horizontalScrollElement}>
                    {this.renderOpenTabs()}
                </div>
            </div>
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
