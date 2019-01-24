import React, { ChangeEvent } from "react";
import { observer } from "mobx-react";
import { faFilePlus, faFileImport } from "@fortawesome/pro-light-svg-icons";
import { action } from "mobx";
import { Bar, EditableBarTab, BarTab, Group } from "essentials";

import { PropertiesPane } from "./properties/PropertiesPane";
import { SheetEditorViewModel } from "../../viewModels/SheetEditorViewModel";
import { Sheet } from "./sheet/Sheet";

type SheetEditorProps = {
    viewModel: SheetEditorViewModel;
};

const styles = require("./SheetEditor.scss");

@observer
export class SheetEditor extends React.Component<SheetEditorProps> {
    render() {
        const { viewModel } = this.props;
        return (
            <>
                <div className={styles.editorPaneContainer}>
                    <Bar>
                        <Group align="center">
                            <EditableBarTab
                                value={viewModel.label}
                                onChange={this.setLabel}
                                onBlur={this.saveSheet}
                                placeholder="Untitled"
                            />
                            <EditableBarTab
                                value={viewModel.document.subtitle}
                                onChange={this.setSubtitle}
                                onBlur={this.saveSheet}
                                placeholder="Subtitle"
                            />
                        </Group>
                    </Bar>
                    <div className={styles.sheetEditor}>
                        <Sheet viewModel={viewModel} />
                    </div>
                </div>
                <div className={styles.propertiesPaneContainer}>
                    <PropertiesPane viewModel={viewModel} />
                </div>
            </>
        );
    }

    @action
    private setLabel = (event: ChangeEvent<HTMLInputElement>) => {
        const { viewModel } = this.props;

        viewModel.updateTitle(event.target.value);
    };

    private setSubtitle = (event: ChangeEvent<HTMLInputElement>) => {
        const { viewModel } = this.props;

        viewModel.updateSubtitle(event.target.value);
    };

    private saveSheet = () => {
        const { viewModel } = this.props;

        viewModel.saveSheet();
    };
}
