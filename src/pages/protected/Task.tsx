import { toggleLoading } from "@/app/slices/loadingSlice";
import { selectRefetch } from "@/app/slices/refetchSlice";
import AddFunction from "@/components/task/AddFunction";
import FunctionsList from "@/components/task/FunctionsList";
import TaskDetails from "@/components/task/TaskDetails";
import TaskInstance from "@/lib/task";
import TaskLib from "@/lib/task";
import {
  fetchFunctionsByTaskInstanceId,
} from "@/services/function-apis";
import { fetchTaskById } from "@/services/task-apis";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Task() {
  const dispatch = useDispatch();

  const { taskId } = useParams();

  const refectFlag = useSelector(selectRefetch);

  //   console.log("taskId:", taskId);

  const [task, setTask] = useState<TaskLib | null>(null);

  useEffect(() => {
    if (taskId) {
      getTask();
    }
    console.log("refetchFlag:", refectFlag);
  }, [taskId, refectFlag]);

  const getTask = async () => {
    dispatch(toggleLoading());
    try {
      const response = await fetchTaskById(Number(taskId));
      console.log("task: ", response);
      setTask(response);
      try {
        const resFn = await fetchFunctionsByTaskInstanceId(Number(taskId));
        console.log("resFn:", resFn);
        setTask(
          (prev) => ({ ...prev, functionInstances: resFn }) as TaskInstance
        );
      } catch (error) {
        console.log("Unable to fetch the fn!", error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
    }
  };

  return (
    taskId &&
    task && (
      <div
        id="task-comp"
        className="px-3 py-3 h-100 d-flex gap-2 overflow-auto"
      >
        <div
          style={{
            width: window.innerWidth < 640 ? "100%" : "65%",
            minHeight: "500px",
          }}
        >
          <div className="d-flex gap-2 align-items-center">
            <h2>Functions</h2>
            {task && task.taskTemplateId && (
              <AddFunction
                task={task}
                setTask={
                  setTask as React.Dispatch<React.SetStateAction<TaskLib>>
                }
                getTask={getTask}
              />
            )}
          </div>
          <FunctionsList task={task} />
        </div>
        <div
          id="task-container"
          className="card h-100"
          style={{ width: window.innerWidth < 640 ? "100%" : "35%" }}
        >
          {task && <TaskDetails task={task} setTask={setTask} />}
        </div>
      </div>
    )
  );
}
