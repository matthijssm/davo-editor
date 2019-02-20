import * as React from "react";
import { observer, inject } from "mobx-react";
import { SortableHandle } from "react-sortable-hoc";
import { faTimes, faSort } from "@fortawesome/pro-light-svg-icons";

import { ISection } from "../../../model/ISection";
import { SectionOptions } from "./SectionOptions";
import { SectionOptionButton } from "./SectionOptionButton";
import { Line } from "./Line";
import { ILine } from "../../../model/ILine";
import { IElement } from "../../../model/IElement";
import { Line as LineModel } from "../../../model/Line";
import { SheetEditorViewModel } from "../../../viewModels/SheetEditorViewModel";

type SectionProps = {
    section: ISection;
    selectedElement: IElement;
    viewModel: SheetEditorViewModel;
    onDelete?: (id: string) => void;
    onSelectElement: (element: IElement) => void;
};

const styles = require("./Section.scss");

const placeholder = "label";

const DragHandle = SortableHandle(() => <SectionOptionButton icon={faSort} />);

@observer
export class Section extends React.Component<SectionProps> {
    private labelInput = React.createRef<HTMLInputElement>();

    render() {
        const { section } = this.props;

        return (
            <div className={styles.section}>
                <div className={styles.label}>
                    <input
                        type="text"
                        className={styles.labelInput}
                        value={section.label}
                        onChange={this.onLabelChange}
                        ref={this.labelInput}
                        placeholder={placeholder}
                    />
                </div>
                <SectionOptions>
                    <DragHandle />
                    <SectionOptionButton icon={faTimes} onClick={this.onDeleteSection} />
                </SectionOptions>

                {this.renderLines(section.lines)}
            </div>
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
