import React, { ChangeEvent } from "react";
import { observer } from "mobx-react";
import { faFilePlus, faFileImport } from "@fortawesome/pro-light-svg-icons";
import { action } from "mobx";
import { Bar, EditableBarTab, BarTab, Group, RadioButtonGroup, InsideLabelRadioButton, styled } from "essentials";

import { PropertiesPane } from "./properties/PropertiesPane";
import { SheetEditorViewModel } from "../../viewModels/SheetEditorViewModel";
import { Sheet } from "./sheet/Sheet";

type SheetEditorProps = {
    viewModel: SheetEditorViewModel;
};

const SheetEditorElement = styled.div`
    flex: 1;
    display: block;
    height: 100%;

    background: #fff;
    padding: 15px;
    overflow: scroll;
`;

const EditorPane = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`;

@observer
export class SheetEditor extends React.Component<SheetEditorProps> {
    render() {
        const { viewModel } = this.props;
        return (
            <>
                <EditorPane>
                    <Bar>
                        <Group align="center">
                            <EditableBarTab value={viewModel.label} onChange={this.setLabel} onBlur={this.saveSheet} placeholder="Untitled" />
                            <EditableBarTab value={viewModel.document.subtitle} onChange={this.setSubtitle} onBlur={this.saveSheet} placeholder="Subtitle" />
                        </Group>
                    </Bar>
                    <SheetEditorElement>
                        <Sheet viewModel={viewModel} />
                    </SheetEditorElement>
                </EditorPane>
                <div>
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
