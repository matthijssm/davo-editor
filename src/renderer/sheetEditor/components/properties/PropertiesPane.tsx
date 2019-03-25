import * as React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { Bar, BarTab, styled } from "essentials";

import { MetaPane } from "./MetaPane";
import { SheetEditorViewModel, PropertiesPaneTabs } from "../../../viewModels/SheetEditorViewModel";
import { SheetPane } from "./SheetPane";

type PropertiesPaneProps = {
    viewModel: SheetEditorViewModel;
};

const Pane = styled.div`
    box-sizing: border-box;
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const PaneContent = styled.div`
    box-sizing: border-box;
    border-left: 1px solid ${p => p.theme.colors.baseHighlight};
    background: ${p => p.theme.colors.base};
    flex-grow: 1;
    padding: 15px;
    display: flex;
    flex-direction: column;
`;

@observer
export class PropertiesPane extends React.Component<PropertiesPaneProps> {
    render() {
        const { viewModel } = this.props;

        return (
            <Pane>
                <Bar>
                    <BarTab fullWidth={true} isActive={viewModel.openPropertiesPane === "Meta"} label="Meta" onClick={this.setOpenPropertiesPane("Meta")} />
                    <BarTab fullWidth={true} label="Sheet" isActive={viewModel.openPropertiesPane === "Sheet"} onClick={this.setOpenPropertiesPane("Sheet")} />
                </Bar>
                <PaneContent>{viewModel.openPropertiesPane === "Meta" ? <MetaPane viewModel={viewModel} /> : <SheetPane viewModel={viewModel} />}</PaneContent>
            </Pane>
        );
    }

    @action
    private setOpenPropertiesPane = (value: PropertiesPaneTabs) => {
        return () => {
            this.props.viewModel.openPropertiesPane = value;
        };
    };
}
