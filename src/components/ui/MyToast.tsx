import { ReactNode, useEffect } from "react";
import { Toast } from "react-bootstrap";

type MyToastProps = {
  show: boolean;
  onClose: () => void;
  message: ReactNode;
};

const MyToast = ({ show, onClose, message }: MyToastProps) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 3000);
  }, []);

  return (
    <div
      className="position-absolute w-100 d-flex justify-content-center z-3"
      style={{
        left: "0px",
        bottom: "24px",
      }}
    >
      <Toast show={show} onClose={onClose} className="border border-primary">
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Taskify Software</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default MyToast;
