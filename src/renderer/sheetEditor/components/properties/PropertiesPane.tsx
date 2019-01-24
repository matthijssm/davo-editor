import * as React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { Bar, BarTab } from "essentials";

import { MetaPane } from "./MetaPane";
import { SheetEditorViewModel, PropertiesPaneTabs } from "../../../viewModels/SheetEditorViewModel";

type PropertiesPaneProps = {
    viewModel: SheetEditorViewModel;
};

const styles = require("./PropertiesPane.scss");

@observer
export class PropertiesPane extends React.Component<PropertiesPaneProps> {
    render() {
        const { viewModel } = this.props;

        return (
            <div className={styles.propertiesPane}>
                <Bar>
                    <BarTab
                        fullWidth={true}
                        isActive={viewModel.openPropertiesPane === "Meta"}
                        label="Meta"
                        onClick={this.setOpenPropertiesPane("Meta")}
                    />
                    <BarTab
                        fullWidth={true}
                        label="Sheet"
                        isActive={viewModel.openPropertiesPane === "Sheet"}
                        onClick={this.setOpenPropertiesPane("Sheet")}
                    />
                </Bar>
                <div className={styles.content}>
                    {viewModel.openPropertiesPane === "Meta" ? <MetaPane viewModel={viewModel} /> : null}
                </div>
            </div>
        );
    }

    @action
    private setOpenPropertiesPane = (value: PropertiesPaneTabs) => {
        return () => {
            this.props.viewModel.openPropertiesPane = value;
        };
    };
}
