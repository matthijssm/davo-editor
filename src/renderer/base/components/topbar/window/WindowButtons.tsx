import React from "react";
import { BrowserWindow } from "electron";
import { observable, action } from "mobx";

import { WindowButton, WindowButtonType } from "./WindowButton";
import { observer } from "mobx-react";

type WindowButtonsProps = {
    window: BrowserWindow;
};

const styles = require("./WindowButtons.scss");

@observer
export class WindowButtons extends React.Component<WindowButtonsProps> {
    @observable
    private isFullscreen = false;

    render() {
        return (
            <div className={styles.windowButtonsContainer}>
                <WindowButton
                    type={WindowButtonType.CLOSE}
                    onclick={this.closeWindow}
                />
                <WindowButton
                    type={WindowButtonType.MINIMIZE}
                    onclick={this.minimizeWindow}
                    disabled={this.isFullscreen}
                />
                <WindowButton
                    type={WindowButtonType.FULLSCREEN}
                    onclick={this.toggleFullscreen}
                />
            </div>
        );
    }

    private closeWindow = () => {
        this.props.window.close();
    };
    private minimizeWindow = () => {
        this.props.window.minimize();
    };
    private toggleFullscreen = () => {
        this.props.window.setFullScreen(!this.props.window.isFullScreen());
    };

    @action
    private setIsFullscreen = () => {
        this.isFullscreen = this.props.window.isFullScreen();
    };

    @action
    componentWillMount = () => {
        this.isFullscreen = this.props.window.isFullScreen();

        this.props.window.on("enter-full-screen", this.setIsFullscreen);
        this.props.window.on("leave-full-screen", this.setIsFullscreen);
    };
}
