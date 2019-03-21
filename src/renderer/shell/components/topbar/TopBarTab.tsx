import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCircle } from "@fortawesome/pro-regular-svg-icons";
import { faSpinnerThird, IconDefinition } from "@fortawesome/pro-light-svg-icons";
import { observer } from "mobx-react";
import styled, { StyledFunction } from "styled-components";

type TopBarTabProps = {
    label?: string;
    icon?: IconDefinition;
    active?: boolean;
    closable?: boolean;
    loading?: boolean;
    unsaved?: boolean;
    onClick?: () => void;
    onClose?: () => void;
};

const Tab = styled("div")<{ isActive: boolean }>`
    -webkit-app-region: no-drag;

    background: ${(p: any) => (p.isActive ? p.theme.colors.primaryHighlight : p.theme.colors.primary)};
    color: ${(p: any) => p.theme.colors.primaryInverted};
    display: flex;
    height: 40px;
    max-width: 200px;
    align-items: center;
    line-height: 0;
    letter-spacing: 1px;
    padding: 0 10px;
    text-align: center;
`;

const TabDescription = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
`;

const TabLabel = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0.5em 0;
`;

const TabActionIcon = styled.div`
    margin: 0 0 0 5px;
    color: ${(p: any) => p.theme.colors.primaryFaded};
    cursor: pointer;

    &:hover {
        color: ${(p: any) => p.theme.colors.primaryInverted};
    }
`;

@observer
export class TopBarTab extends React.Component<TopBarTabProps> {
    render() {
        const { active, closable, loading, label, icon, unsaved } = this.props;

        return (
            <Tab isActive={active} onClick={this.props.onClick}>
                <TabDescription>
                    {icon ? <FontAwesomeIcon icon={icon} size="lg" /> : null}
                    {label ? <TabLabel>{label}</TabLabel> : null}
                </TabDescription>

                {closable && (
                    <TabActionIcon onClick={this.onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </TabActionIcon>
                )}

                {loading && (
                    <TabActionIcon>
                        <FontAwesomeIcon icon={faSpinnerThird} spin={true} />
                    </TabActionIcon>
                )}

                {unsaved && (
                    <TabActionIcon onClick={this.onClose}>
                        <FontAwesomeIcon icon={faCircle} />
                    </TabActionIcon>
                )}
            </Tab>
        );
    }

    private onClose = (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();

        this.props.onClose();
    };
}
