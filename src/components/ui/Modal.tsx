import { HTMLAttributes, ReactNode } from "react";
import { Modal as RBS_Modal } from "react-bootstrap";

type ModalSize = "sm" | "lg" | "xl" | undefined;

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  open: boolean;
  heading?: ReactNode;
  onHide: () => void;
  backdrop?: "static" | boolean;
  centered?: boolean;
  size?: ModalSize;
  addtionalBtnName?: string,
  addtionalBtnVisibility?: boolean;
}

const Modal = ({
  children,
  open,
  onHide,
  heading = "Modal heading",
  centered = false,
  backdrop = false,
  size = "sm",
}: ModalProps) => {
  return (
    <RBS_Modal
      show={open}
      onHide={onHide}
      backdrop={
        backdrop || (typeof backdrop === "string" && backdrop === "static")
          ? "static"
          : undefined
      }
      centered={centered}
      size={size}
    >
      <RBS_Modal.Header closeButton>
        {<RBS_Modal.Title>{heading}</RBS_Modal.Title>}
      </RBS_Modal.Header>
      <RBS_Modal.Body>{children}</RBS_Modal.Body>
    </RBS_Modal>
  );
};

export default Modal;
