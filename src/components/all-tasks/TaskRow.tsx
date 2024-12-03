import Task from "@/lib/task";
import { getFormattedDate } from "@/utils/helpers";
import { Link } from "react-router-dom";

import styles from "@/styles/TaskRow.module.css";
import { useEffect, useState } from "react";

import TaskTemplate from "@/lib/task-template";
import { fetchFunctionsByTaskInstanceId } from "@/services/function-apis";
import { useSelector } from "react-redux";
import { selectTaskTemplates } from "@/app/slices/taskTemplatesSlice";

type TaskRowProps = {
  task: Task;
  taskIndex: number;
  selectedTasks: Task[];
  onSelectTask: (task: Task) => void;
  pageData: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
  };
};
export default function TaskRow({
  task,
  taskIndex,
  onSelectTask,
  selectedTasks,
  pageData,
}: TaskRowProps) {
  const taskTemplates = useSelector(selectTaskTemplates);

  const [taskTemplate, setTaskTemplate] = useState<TaskTemplate | null>(null);

  const [department, setDepartment] = useState("");

  const [lastEdited, setLastEdited] = useState<Date | null>(null);

  useEffect(() => {
    const newTaskTemplate = taskTemplates.find(
      (t) => t.id == task.taskTemplateId
    );
    setTaskTemplate(newTaskTemplate as TaskTemplate);
  }, [task.taskTemplateId]);

  useEffect(() => {
    (async () => {
      if (task) {
        try {
          const response = await fetchFunctionsByTaskInstanceId(
            task.id as number
          );
          console.log("task's fn:", response);
          for (let i = 0; i < response?.length; i++) {
            console.log("in loop");
            console.log("last edited date:", response[i].closedAt);
            if (response[i].closedAt != null) {
              setLastEdited(response[i].closedAt as Date);
              setDepartment(
                taskTemplate?.functionTemplates.find(
                  (ft) => ft.id == response[i].functionTemplateId
                )?.department as string
              );
              break;
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [task]);

  return (
    <Link
      to={`/home/tasks/${task.abbreviation}`}
      className={`${styles["task-row-card"]} d-flex border-bottom text-decoration-none`}
      style={{ paddingRight: "14px" }}
    >
      <p
        className="form-check border-end d-flex justify-content-center align-items-center"
        style={{ width: "3%" }}
      >
        <input
          className="form-check-input m-0 "
          type="checkbox"
          checked={selectedTasks.some((t) => t.id === task.id)}
          onChange={() => onSelectTask(task)}
        />
      </p>
      <p className="border-end text-center" style={{ width: "7%" }}>
        {(pageData.pageNumber - 1) * pageData.pageSize + taskIndex + 1}.
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        #{task.abbreviation}
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        {taskTemplate?.title}
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        {task.priorityType === "HIGH" && (
          <span className="badge bg-danger">{task.priorityType}</span>
        )}
        {task.priorityType === "MEDIUM" && (
          <span className="badge bg-secondary">{task.priorityType}</span>
        )}
        {task.priorityType === "NORMAL" && (
          <span className="badge bg-light text-dark border">
            {task.priorityType}
          </span>
        )}
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        {department}
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        {getFormattedDate(lastEdited as Date)}
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        {!task.closedAt ? (
          <span className="badge bg-warning">IN_PROGRESS</span>
        ) : (
          <span className="badge bg-success">CLOSED</span>
        )}
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        {task.closedAt ? getFormattedDate(task.closedAt as Date) : "-"}
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        <Link
          to={`/home/tasks/${task.id}`}
          className="btn btn-primary py-1"
          style={{ fontSize: "14px" }}
        >
          View
        </Link>
      </p>
    </Link>
  );
}
