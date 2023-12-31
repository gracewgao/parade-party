import { ReactNode } from "react";
import styled from "styled-components";

interface IModal {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const ModalOverlay = styled.div`
  height: 100%;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const ModalContent = styled.div`
  color: black;
  font-size: 18px;
`;

const ModalFrame = styled.div`
  background-color: #e7ede7;
  width: 300px;
  padding: 16px;
  position: absolute;
  border: 4px solid black;
  box-shadow: inset 3px 3px #c9c5be, inset -3px -3px #898580;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalClose = styled.button`
  font-size: 24px !important;
  position: absolute;
  top: 8px;
  right: 8px;

  background: none;
  border: none;
  margin: 0;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: none;
`;

function Modal(props: IModal) {
  return props.isOpen ? (
    <ModalOverlay>
      <ModalFrame>
        {props.onClose ? (
          <ModalClose onClick={props.onClose}>{"[X]"}</ModalClose>
        ) : null}
        <ModalContent>{props.children}</ModalContent>
      </ModalFrame>
    </ModalOverlay>
  ) : null;
}

export default Modal;
