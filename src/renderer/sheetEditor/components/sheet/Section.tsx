import * as React from "react";
import { observer, inject } from "mobx-react";
import { SortableHandle } from "react-sortable-hoc";
import { faTimes, faSort } from "@fortawesome/pro-light-svg-icons";
import { styled } from "essentials";

import { ISection } from "../../../model/ISection";
import { SectionOptions } from "./SectionOptions";
import { SectionOptionButton } from "./SectionOptionButton";
import { Line } from "./Line";
import { ILine } from "../../../model/ILine";
import { IElement } from "../../../model/IElement";
import { SheetEditorViewModel } from "../../viewModels/SheetEditorViewModel";

type SectionProps = {
    section: ISection;
    selectedElement: IElement;
    viewModel: SheetEditorViewModel;
    onDelete?: (id: string) => void;
    onSelectElement: (element: IElement) => void;
    onPaste?: (content: string) => void;
};

const placeholder = "label";

const DragHandle = SortableHandle(() => <SectionOptionButton icon={faSort} />);

const SectionElement = styled.div`
    width: 100%;
    border: 1px solid ${p => p.theme.colors.baseHighlight};
    padding: 15px;
    border-radius: 5px;
    background: ${p => p.theme.colors.base};

    position: relative;
    overflow: none;
`;

const Label = styled.input`
    position: absolute;
    top: -8px;

    font-size: ${p => p.theme.font.fontSizeBody};
    font-weight: bold;
    border: none;
    outline: none;
    padding: 0 5px;
    width: auto;
`;

@observer
export class Section extends React.Component<SectionProps> {
    private labelInput = React.createRef<HTMLInputElement>();

    render() {
        const { section } = this.props;

        return (
            <SectionElement>
                <Label type="text" value={section.label} onChange={this.onLabelChange} ref={this.labelInput} placeholder={placeholder} />
                <SectionOptions>
                    <DragHandle />
                    <SectionOptionButton icon={faTimes} onClick={this.onDeleteSection} />
                </SectionOptions>

                {this.renderLines(section.lines)}
            </SectionElement>
        );
    }

    onLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { section } = this.props;

        this.setLabelInputSize(event.target.value.length);

        section.label = event.target.value;
    };

    onDeleteSection = () => {
        const { section, onDelete } = this.props;

        onDelete(section.id);
    };

    private setLabelInputSize = (size: number) => {
        if (size < 1) {
            this.labelInput.current.size = placeholder.length;
        } else {
            this.labelInput.current.size = size;
        }
    };

    private renderLines(lines: ILine[]) {
        return lines.map((line, index) => {
            const isActive = this.props.selectedElement && line.id === this.props.selectedElement.id;

            return (
                <Line
                    key={line.id}
                    line={line}
                    isActive={isActive}
                    onNewLine={this.onNewLine(line)}
                    onRemove={this.onRemove(line)}
                    onFocus={this.props.onSelectElement}
                    onArrowDown={this.onArrowDown(index)}
                    onArrowUp={this.onArrowUp(index)}
                    viewModel={this.props.viewModel}
                    onPaste={this.props.onPaste}
                />
            );
        });
    }

    private onArrowDown = (currentIndex: number) => {
        const { onSelectElement, section } = this.props;
        return (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (currentIndex < section.lines.length - 1) {
                onSelectElement(section.lines[currentIndex + 1]);
                event.preventDefault();
            }
        };
    };

    private onArrowUp = (currentIndex: number) => {
        const { onSelectElement, section } = this.props;

        return (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (currentIndex > 0) {
                onSelectElement(section.lines[currentIndex - 1]);
                event.preventDefault();
            }
        };
    };

    private onNewLine = (line: ILine) => {
        return (value: string) => {
            const { section, onSelectElement } = this.props;
            const newLine = section.addLine(value, line);
            onSelectElement(newLine);
        };
    };

    private onRemove = (line: ILine) => {
        return (value: string) => {
            const { section, onSelectElement } = this.props;
            const retainedLine = section.removeLine(value, line);
            onSelectElement(retainedLine);
        };
    };

    componentDidMount() {
        this.setLabelInputSize(this.labelInput.current.value.length);
    }
}
