import * as React from "react";
import { ISection } from "../../../model/ISection";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-light-svg-icons";

type SectionProps = {
    section: ISection;
    onDelete?: (id: string) => void;
};

const styles = require("./Section.scss");

const placeholder = "label";

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
                <div className={styles.closeIcon} onClick={this.onDeleteSection}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                My id is {section.id}
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

    componentDidMount() {
        this.setLabelInputSize(this.labelInput.current.value.length);
    }
}
