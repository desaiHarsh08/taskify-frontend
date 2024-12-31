import { FunctionInstance } from "@/lib/task";
import { getFormattedDate } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";

import styles from "@/styles/TaskRow.module.css";
import { useEffect, useState } from "react";

import TaskTemplate from "@/lib/task-template";
import {
  fetchFunctionById,
  fetchFunctionsByTaskInstanceId,
} from "@/services/function-apis";
import { useSelector } from "react-redux";
import { selectTaskTemplates } from "@/app/slices/taskTemplatesSlice";
import TaskSummary from "@/lib/task-summary";
import { Customer } from "@/lib/customer";
import { fetchCustomerById } from "@/services/customer-apis";

type TaskRowProps = {
  task: TaskSummary;
  taskIndex: number;
  selectedTasks: TaskSummary[];
  onSelectTask: (task: TaskSummary) => void;
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
  //   onSelectTask,
  //   selectedTasks,
  pageData,
}: TaskRowProps) {
  console.log("task:", task);
  const navigate = useNavigate();
  const taskTemplates = useSelector(selectTaskTemplates);

  const [taskTemplate, setTaskTemplate] = useState<TaskTemplate | null>(null);

  const [department, setDepartment] = useState("");

  const [lastEdited, setLastEdited] = useState<Date | null>(null);

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [fnInstance, setFnInstance] = useState<FunctionInstance | null>(null);

  useEffect(() => {
    const newTaskTemplate = taskTemplates.find(
      (t) => t.id == task.taskTemplateId
    );
    setTaskTemplate(newTaskTemplate as TaskTemplate);
    getCustomer(task.customerId);
    getFunctionInstance(task.functionId);
  }, [task.taskTemplateId, task]);

  const getCustomer = async (customerId: number) => {
    try {
      const response = await fetchCustomerById(customerId);
      setCustomer(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getFunctionInstance = async (fnInstanceId: number) => {
    if (fnInstanceId == undefined) {
      return;
    }
    try {
      const response = await fetchFunctionById(fnInstanceId);
      setFnInstance(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      //   if (task) {
      try {
        console.log(task);
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
      //   }
    })();
  }, [task, customer, task.taskTemplateId]);

  return (
    <tr
      className={`${styles["task-row-card"]} border-bottom `}
      onClick={() => navigate(`/home/tasks/${task.abbreviation}`)}
    >
      <td className="border-end text-center" style={{ width: "9%" }}>
        {(pageData.pageNumber - 1) * pageData.pageSize + taskIndex + 1}.
      </td>
      <td className="border-end text-center" style={{ width: "13%" }}>
        #{task.abbreviation}
      </td>
      <td className="border-end text-center" style={{ width: "13%" }}>
        {customer && customer.name}
      </td>
      <td className="border-end text-center" style={{ width: "13%" }}>
        {task.jobNumber}
      </td>
      <td className="border-end text-center" style={{ width: "13%" }}>
        {department}
      </td>
      <td className="border-end text-center" style={{ width: "13%" }}>
        {fnInstance &&
          taskTemplate?.functionTemplates.find(
            (fnt) => fnt.id == fnInstance.functionTemplateId
          )?.title}
      </td>
      <td className="border-end text-center" style={{ width: "13%" }}>
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
      </td>

      <td className="border-end text-center" style={{ width: "13%" }}>
        {getFormattedDate(lastEdited as Date)}
      </td>

      {/* </Link> */}
    </tr>
  );
}
