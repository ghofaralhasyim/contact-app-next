import { ReactNode } from 'react';
import styled from "@emotion/styled";

interface StyledComponentProps {
    display: string
}

const ModalWrapper = styled.div<StyledComponentProps>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    display: ${(props) => props.display || 'none' };
    justify-content: center;
    align-items: center;
    z-index: 20;

    .overlay {
        background-color: rgba(0,0,0,0.5);
        width: 100%;
        height: 100dvh;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    }
    .wrapper {
        position: relatiive;
    }
`

interface ModalProps {
    children: ReactNode,
    show: boolean,
    closeModal: () => void
}

const Modal: React.FC<ModalProps> = ({ show, children, closeModal }) => {
    return (
        <ModalWrapper display={show ? 'flex' : 'none'}>
            <div className="overlay" onClick={() => closeModal()}></div>
            <div className="wrapper">
                { children }
            </div>
        </ModalWrapper>
    )
}

export default Modal;