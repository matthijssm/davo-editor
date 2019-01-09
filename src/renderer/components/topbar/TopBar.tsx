import React from 'react';
import classNames from 'classNames';
import { WindowButtons } from './window/WindowButtons';
import { inject, observer } from 'mobx-react';
import { EditorState } from '../EditorState';
import { TopBarTab } from './TopBarTab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList, faCogs } from '@fortawesome/pro-light-svg-icons';
import { ITabbedEditor } from '../../controls/ITabbedEditor';
import ReactDOM from 'react-dom';

type TopBarProps = {
    editorState: EditorState;
};

@observer
export class TopBar extends React.Component<TopBarProps> {
    private horizontalScrollElement = React.createRef<HTMLDivElement>();

    private tabElements: TopBarTab[] = [];

    constructor(props: TopBarProps) {
        super(props);
        this.horizontalScrollElement = React.createRef();
    }

    render() {
        const styles = require('./TopBar.scss');

        return (
            <div className={classNames('topBar')}>
                <WindowButtons window={this.props.editorState.browserWindow} />

                <TopBarTab active={true} icon={faThList} />
                <TopBarTab active={false} icon={faCogs} />

                <div
                    className="horizontalScrollable"
                    ref={this.horizontalScrollElement}>
                    {this.renderOpenTabs()}
                </div>
            </div>
        );
    }

    private renderOpenTabs() {
        const { editorState } = this.props;

        const editors = editorState.openEditors;

        return editors.map((editorViewModel, index) => {
            const isActive = editorState.activeEditor
                ? editorViewModel.id === editorState.activeEditor.id
                : false;

            return (
                <TopBarTab
                    active={isActive}
                    label={editorViewModel.label}
                    loading={editorViewModel.isLoading}
                    closable={true}
                    key={editorViewModel.id}
                    onClick={this.onClick(editorViewModel)}
                    onClose={this.onClose(editorViewModel)}
                    ref={ref => (this.tabElements[index] = ref)}
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
                    if (
                        offsetLeft + scrollWidth >
                        container.clientWidth + container.scrollLeft
                    ) {
                        container.scrollLeft =
                            offsetLeft - container.clientWidth + scrollWidth;
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
            offsetLeft + scrollWidth <=
                container.clientWidth + container.scrollLeft
        );
    }

    private onClose = (editor: ITabbedEditor) => {
        return () => {
            this.props.editorState.closeEditor(editor);
        };
    };

    componentDidUpdate() {
        this.scrollActiveTabIntoView();
    }
}
