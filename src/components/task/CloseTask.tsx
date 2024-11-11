import { toggleLoading } from "@/app/slices/loadingSlice";
import { useAuth } from "@/hooks/useAuth";
import Task from "@/lib/task";
import { doCloseTask } from "@/services/task-apis";
import React from "react";
import { useDispatch } from "react-redux";
import Button from "../ui/Button";

type CloseTaskProps = {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
};

export default function CloseTask({ task, setTask }: CloseTaskProps) {
  const dispatch = useDispatch();

  const { user } = useAuth();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = { ...task };
    newTask.closedByUserId = user?.id as number;

    dispatch(toggleLoading());
    try {
      const response = await doCloseTask(newTask);
      console.log(response);
      setTask(response);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="fs-5">Are you sure that you want to mark this task as done?</p>
      <p>This process cannot be undone.</p>
      <div className="d-flex justify-content-end mt-4">
        <Button variant={"secondary"}>Done</Button>
      </div>
    </form>
  );
}
