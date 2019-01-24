import * as React from "react";
import { Button } from "essentials";

import { SheetEditorViewModel } from "../../../viewModels/SheetEditorViewModel";
import { ISection } from "../../../model/ISection";
import { Section } from "./Section";
import { observer } from "mobx-react";

type SheetProps = {
    viewModel: SheetEditorViewModel;
};

@observer
export class Sheet extends React.Component<SheetProps> {
    render() {
        const { viewModel } = this.props;

        const document = viewModel.document;

        return (
            <div>
                {this.renderSections(document.sections)}
                <Button value="Add a new section" fullWidth={true} onClick={this.addSection} />
            </div>
        );
    }

    private addSection = () => {
        const { viewModel } = this.props;

        viewModel.createSection();
    };

    private renderSections(sections: ISection[]) {
        return sections.map(section => {
            return <Section key={section.id} section={section} onDelete={this.onDeleteSection} />;
        });
    }

    private onDeleteSection = (id: string) => {
        const { viewModel } = this.props;

        viewModel.deleteSection(id);
    };
}
