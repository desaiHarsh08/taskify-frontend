import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Task from "@/lib/task";
import EditTaskForm from "./EditTaskForm";
import DeleteTaskForm from "./DeleteTaskForm";
import CloseTask from "./CloseTask";
import TaskTemplate from "@/lib/task-template";

type TaskActionsProps = {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  taskTemplate: TaskTemplate;
};

export default function TaskActions({
  task,
  setTask,
  taskTemplate,
}: TaskActionsProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDoneModal, setOpenDoneModal] = useState(false);
  const [isFnRemaining, setIsFnRemaining] = useState(false);

  useEffect(() => {
    setIsFnRemaining(task.functionInstances?.some((fn) => !fn.closedAt) as boolean);
  }, [task]);

  return (
    <div className="d-flex gap-2 py-3">
      <Button
        type="button"
        variant="success"
        onClick={() => setOpenEditModal(true)}
      >
        Edit
      </Button>
      <Modal
        open={openEditModal}
        onHide={() => setOpenEditModal(false)}
        heading={`Edit: Task (#${task.abbreviation})`}
        backdrop
        centered
        size="lg"
      >
        <EditTaskForm
          task={task}
          setTask={setTask}
          taskTemplate={taskTemplate}
        />
      </Modal>
      {/* <Button
        type="button"
        variant="danger"
        onClick={() => setOpenDeleteModal(true)}
      >
        Delete
      </Button> */}
      <Modal
        open={openDeleteModal}
        onHide={() => setOpenDeleteModal(false)}
        backdrop
        centered
        size="lg"
        heading={`Delete: Task (#${task.abbreviation})`}
      >
        <DeleteTaskForm task={task} />
      </Modal>
      <Button
        type="button"
        variant="secondary"
        onClick={() => setOpenDoneModal(true)}
        disabled={isFnRemaining}
      >
        Done
      </Button>
      <Modal
        open={openDoneModal}
        onHide={() => setOpenDoneModal(false)}
        backdrop
        centered
        size="lg"
        heading={`Done: Task (#${task.abbreviation})`}
      >
        <CloseTask task={task} setTask={setTask} />
      </Modal>
    </div>
  );
}
