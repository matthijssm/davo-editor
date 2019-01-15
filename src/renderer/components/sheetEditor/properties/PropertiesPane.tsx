import * as React from 'react';
import { Group, HeaderBar } from '../../explorer/HeaderBar';
import { HeaderBarTab } from '../../explorer/HeaderBarTab';

type PropertiesPaneProps = {};

const styles = require('./PropertiesPane.scss');

export class PropertiesPane extends React.Component<PropertiesPaneProps> {
    render() {
        return (
            <div className="propertiesPane">
                <HeaderBar>
                    <HeaderBarTab
                        fullWidth={true}
                        isActive={true}
                        label="Meta"
                    />
                    <HeaderBarTab fullWidth={true} label="Sheet" />
                </HeaderBar>
                <div className="content" />
            </div>
        );
    }
}
