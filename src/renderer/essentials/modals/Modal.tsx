import * as React from "react";
import styled from "styled-components";
import ReactModal from "react-modal";

const ModalOverlay = styled.div`
    position: absolute;
    background: rgba(0, 0, 0, 0.7);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    z-index: 100;
    width: 300px;
    background: white;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    outline: none;
    overflow: hidden;
    display: block;
    box-sizing: border-box;
`;

type ModalProps = {
    title?: string;
    isOpen: boolean;
    onClose?: () => void;
};

export class Modal extends React.Component<ModalProps> {
    render() {
        return (
            <ModalOverlay>
                <ModalContainer>{this.props.children}</ModalContainer>
            </ModalOverlay>
        );
    }
}
