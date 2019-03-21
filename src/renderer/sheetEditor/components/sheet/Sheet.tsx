import * as React from "react";
import { Button, styled } from "essentials";
import { observer, Provider } from "mobx-react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import classNames from "classnames";
import Modal from "react-modal";

import { SheetEditorViewModel } from "../../../viewModels/SheetEditorViewModel";
import { ISection } from "../../../model/ISection";
import { Section } from "./Section";
import { IElement } from "../../../model/IElement";
import { ImportDialog } from "../modals/ImportDialog";

type SheetProps = {
    viewModel: SheetEditorViewModel;
};

const SheetElement = styled.div`
    width: 100%;
`;

const SectionList = styled.ul`
    padding: 0;
    list-style: none;
`;

const SectionListItem = styled.li`
    list-style: none;
    margin-bottom: 22px;
`;

const SortableItem = SortableElement(({ children }) => <SectionListItem>{children}</SectionListItem>);

const SortableSectionList = SortableContainer(({ children }) => {
    return <SectionList>{children}</SectionList>;
}) as any;

@observer
export class Sheet extends React.Component<SheetProps> {
    render() {
        const { viewModel } = this.props;

        const document = viewModel.document;

        return (
            <Provider viewModel={viewModel}>
                <SheetElement>
                    <SortableSectionList items={document.sections} onSortEnd={this.onSortEnd} useDragHandle={true} lockAxis="y" lockToContainerEdges={true}>
                        {this.renderSections(document.sections)}
                    </SortableSectionList>
                    <Button value="Add a new section" fullWidth={true} onClick={this.addSection} />
                    {/* <ImportDialog /> */}
                </SheetElement>
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
                        viewModel={this.props.viewModel}
                        onPaste={this.onPaste}
                    />
                </SortableItem>
            );
        });
    }

    private onPaste = (content: string) => {
        // const { viewModel } = this.props;
    };

    private onSelectElement = (element: IElement) => {
        const { viewModel } = this.props;

        viewModel.setSelectedElement(element);
    };

    private onDeleteSection = (id: string) => {
        const { viewModel } = this.props;

        viewModel.deleteSection(id);
    };
}
