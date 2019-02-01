import * as React from "react";
import { Button } from "essentials";
import { observer, Provider } from "mobx-react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import classNames from "classnames";

import { SheetEditorViewModel } from "../../../viewModels/SheetEditorViewModel";
import { ISection } from "../../../model/ISection";
import { Section } from "./Section";
import { IElement } from "../../../model/IElement";

type SheetProps = {
    viewModel: SheetEditorViewModel;
};

const styles = require("./Sheet.scss");

const SortableItem = SortableElement(({ children }) => (
    <li className={classNames("test", styles.sectionListItem)}>{children}</li>
));

const SortableSectionList = SortableContainer(({ children }) => {
    return <ul className={classNames("test2", styles.sectionList)}>{children}</ul>;
}) as any;

@observer
export class Sheet extends React.Component<SheetProps> {
    render() {
        const { viewModel } = this.props;

        const document = viewModel.document;

        return (
            <Provider viewModel={viewModel}>
                <div className={styles.sheet}>
                    <SortableSectionList
                        items={document.sections}
                        onSortEnd={this.onSortEnd}
                        useDragHandle={true}
                        lockAxis="y"
                        lockToContainerEdges={true}
                        helperClass={styles.sectionList}
                    >
                        {this.renderSections(document.sections)}
                    </SortableSectionList>
                    <Button value="Add a new section" fullWidth={true} onClick={this.addSection} />
                </div>
            </Provider>
        );
    }

    private onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
        const { viewModel } = this.props;

        const document = viewModel.document;

        if (oldIndex !== newIndex) {
            document.sections.splice(newIndex, 0, document.sections.splice(oldIndex, 1)[0]);
        }
    };

    private addSection = () => {
        const { viewModel } = this.props;

        viewModel.createSection();
    };

    private renderSections(sections: ISection[]) {
        return sections.map((section, index) => {
            return (
                <SortableItem index={index} key={section.id}>
                    <Section
                        section={section}
                        onDelete={this.onDeleteSection}
                        onSelectElement={this.onSelectElement}
                        selectedElement={this.props.viewModel.selectedElement}
                    />
                </SortableItem>
            );
        });
    }

    private onSelectElement = (element: IElement) => {
        const { viewModel } = this.props;

        viewModel.setSelectedElement(element);
    };

    private onDeleteSection = (id: string) => {
        const { viewModel } = this.props;

        viewModel.deleteSection(id);
    };
}
