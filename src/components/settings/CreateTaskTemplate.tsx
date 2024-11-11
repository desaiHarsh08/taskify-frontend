import { useState } from "react";
import Button from "../ui/Button";
import { MdAdd } from "react-icons/md";
import Modal from "../ui/Modal";
import InputTaskType from "./InputTaskType";
import InputFunctions from "./InputFunctions";

export default function CreateTaskPrototype() {
  const [openInputTaskType, setOpenInputTaskType] = useState(false);
  const [openInputFunctionsModal, setOpenInputFunctionsModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenInputTaskType(true)}>
        <MdAdd />
        <span>Add</span>
      </Button>
      <Modal
        open={openInputTaskType}
        onHide={() => setOpenInputTaskType(false)}
        backdrop
        centered
        size="lg"
        heading="Add Task Prototype"
      >
        <InputTaskType
          onCancel={() => setOpenInputTaskType(false)}
          onContinue={() => {
            setOpenInputTaskType(false);
            setOpenInputFunctionsModal(true);
          }}
        />
      </Modal>
      <Modal
        open={openInputFunctionsModal}
        onHide={() => setOpenInputFunctionsModal(false)}
        backdrop
        centered
        size="xl"
        heading="Input Function Prototypes"
      >
        <InputFunctions />
      </Modal>
    </>
  );
}
