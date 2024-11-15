import { FaEye } from "react-icons/fa";

import Button from "../ui/Button";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Modal from "../ui/Modal";
import { useState } from "react";
import { FieldInstance } from "@/lib/task";
import { FieldTemplate } from "@/lib/task-template";
import DoneField from "./DoneField";
import { closeField, deleteField } from "@/services/field-apis";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { toggleLoading } from "@/app/slices/loadingSlice";
import { toggleRefetch } from "@/app/slices/refetchSlice";
import DeleteField from "./DeleteField";
import EditColumn from "./EditColumn";

type FieldActionsProps = {
  field: FieldInstance;
  fieldTemplate: FieldTemplate;
};

export default function FieldActions({
  field,
  fieldTemplate,
}: FieldActionsProps) {
  const { user } = useAuth();

  const dispatch = useDispatch();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDoneModal, setOpenDoneModal] = useState(false);

  const handleDoneField = async () => {
    dispatch(toggleLoading());
    try {
      const response = await closeField(field, user?.id as number);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
      dispatch(toggleRefetch());
      setOpenDoneModal(false);
    }
  };

  const handleDeleteField = async () => {
    dispatch(toggleLoading());
    try {
      const response = await deleteField(field.id as number);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
      dispatch(toggleRefetch());
      setOpenDeleteModal(false);
    }
  };

  return (
    <div className="h-100 d-flex justify-content-center gap-2 align-items-center">
      <Button
        type="button"
        variant="success"
        onClick={() => setOpenEditModal(true)}
        // disabled={field.isClosed}
      >
        <FaEye />
      </Button>
      <Modal
        open={openEditModal}
        onHide={() => setOpenEditModal(false)}
        backdrop
        centered
        size="xl"
        heading={
          <div className="d-flex align-items-center gap-2">
            <p>Edit</p>
            <p className="text-bg-secondary badge">{fieldTemplate.title}</p>
          </div>
        }
      >
        <EditColumn field={field} setOpenEditModal={setOpenEditModal} />
      </Modal>
      {/* <Button
        type="button"
        variant="danger"
        onClick={() => setOpenDeleteModal(true)}
        disabled={field.isClosed}
      >
        <MdOutlineDeleteOutline />
      </Button> */}
      <Modal
        open={openDeleteModal}
        onHide={() => setOpenDeleteModal(false)}
        backdrop
        centered
        size="lg"
        heading={
          <div className="d-flex align-items-center gap-2">
            <p>Delete</p>
            <p className="text-bg-secondary badge">{fieldTemplate.title}</p>
            <p>?</p>
          </div>
        }
      >
        <DeleteField onContinue={handleDeleteField} />
      </Modal>
      <Button
        type="button"
        variant="secondary"
        onClick={() => setOpenDoneModal(true)}
        disabled={!!field.closedAt}
      >
        <IoIosCheckmarkCircleOutline />
      </Button>
      <Modal
        open={openDoneModal}
        onHide={() => setOpenDoneModal(false)}
        backdrop
        centered
        size="lg"
        heading={
          <div className="d-flex align-items-center gap-2">
            <p>Done</p>
            <p className="text-bg-secondary badge">{fieldTemplate.title}</p>
            <p>?</p>
          </div>
        }
      >
        <DoneField onContinue={handleDoneField} />
      </Modal>
    </div>
  );
}
