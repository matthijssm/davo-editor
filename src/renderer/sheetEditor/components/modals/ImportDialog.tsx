import * as React from "react";
import { KeySelectField } from "../properties/controls/KeySelectField";
import { KeyUtils } from "../../parsers/utils/KeyUtils";
import { Key } from "../../../model/Key";
import { Button } from "essentials";
import { Modal } from "../../../essentials/modals/Modal";

type ImportDialogProps = {};

const styles = require("./ImportDialog.scss");

export class ImportDialog extends React.Component<ImportDialogProps> {
    render() {
        return (
            <Modal isOpen={true} title="You've got chords!">
                <div className={styles.dialogHeader}>
                    <p className={styles.dialogHeaderTitle}>You've got chords!</p>
                </div>
                <div className={styles.dialogContent}>
                    Please select the key the pasted chords are in.
                    <KeySelectField activeKey={KeyUtils.fromString("C#m")} onChange={this.onChange} />
                </div>
                <div className={styles.dialogFooter}>
                    <Button value="Save" />
                    <Button value="Cancel" />
                </div>
            </Modal>
        );
    }

    private onChange = (key: Key) => {
        console.log("key");
    };
}
