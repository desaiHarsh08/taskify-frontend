import { toggleLoading } from "@/app/slices/loadingSlice";
import Task from "@/lib/task";
import { deleteTask } from "@/services/task-apis";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

type DeleteTaskFormProps = {
  task: Task;
};

export default function DeleteTaskForm({ task }: DeleteTaskFormProps) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(toggleLoading());
    try {
      const response = await deleteTask(task.id as number);
      console.log(response);
      navigate("/home/tasks", { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="fs-5">Are you sure that you want to delete this task?</p>
      <p>This process cannot be undone.</p>
      <div className="d-flex justify-content-end mt-4">
        <Button variant={"danger"}>Delete</Button>
      </div>
    </form>
  );
}
