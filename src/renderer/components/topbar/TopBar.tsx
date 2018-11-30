import React from 'react';
import classNames from 'classNames';
import { WindowButtons } from './window/WindowButtons';
import { inject } from 'mobx-react';
import { EditorState } from '../EditorState';
import { TopBarTab } from './TopBarTab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList, faCogs } from '@fortawesome/pro-light-svg-icons';

type TopBarProps = {
    editorState: EditorState;
};

export class TopBar extends React.Component<TopBarProps> {
    render() {
        const styles = require('./TopBar.scss');

        console.log(styles);

        return (
            <div className={classNames('topBar')}>
                <WindowButtons window={this.props.editorState.browserWindow} />

                <TopBarTab active={true}>
                    <FontAwesomeIcon icon={faThList} size="lg" />
                </TopBarTab>
                <TopBarTab active={false}>
                    <FontAwesomeIcon icon={faCogs} size="lg" />
                </TopBarTab>
                {/* <TopBarTab active={false} closable={true}>
                    Files 2
                </TopBarTab>
                <TopBarTab active={false} loading={true}>
                    Files 3
                </TopBarTab>
                <TopBarTab active={false}>Files 4</TopBarTab> */}
            </div>
        );
    }
}
