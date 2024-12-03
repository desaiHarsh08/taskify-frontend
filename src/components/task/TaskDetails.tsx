import { Tab, Tabs } from "react-bootstrap";
// import TaskActions from "./TaskActions";
import CustomerInfo from "./CustomerInfo";
import TaskActions from "./TaskActions";
import Task from "@/lib/task";
import { useEffect, useState } from "react";
import TaskTemplate from "@/lib/task-template";
import { fetchTaskTemplateById } from "@/services/task-template-apis";
import { fetchUserById } from "@/services/auth-apis";
import User from "@/lib/user";
import { useSelector } from "react-redux";
import { selectRefetch } from "@/app/slices/refetchSlice";

type TaskDetailsProps = {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
};

export default function TaskDetails({ task, setTask }: TaskDetailsProps) {
  const refetchFlag = useSelector(selectRefetch);

  const [taskTemplate, settaskTemplate] = useState<TaskTemplate | null>(
    null
  );
  const [createdByUser, setCreatedByUser] = useState<User | null>(null);
  const [assignedUser, setAssignedUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchTaskTemplateById(
          task.taskTemplateId as number
        );
        settaskTemplate(response);
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await fetchUserById(task.assignedToUserId as number);
        setAssignedUser(response);
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await fetchUserById(task.createdByUserId as number);
        setCreatedByUser(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [task.taskTemplateId, refetchFlag]);

  return (
    <div
      id="task-details"
      className="p-2 overflow-auto h-100"
      style={{ minHeight: "500px" }}
    >
      <div>
        <h4 className="border-bottom pb-2">TASK #{task.abbreviation}</h4>
        <ul
          className="px-2 d-flex flex-column gap-2"
          style={{ listStyle: "none" }}
        >
          <li className="d-flex gap-2">
            <p style={{ width: "149px" }}>Type:</p>
            <p>{taskTemplate?.title}</p>
          </li>
          <li className="d-flex gap-2">
            <p style={{ width: "149px" }}>Priority:</p>
            <p>
              {task.priorityType === "HIGH" && (
                <span className="badge text-bg-danger">
                  {task.priorityType}
                </span>
              )}
              {task.priorityType === "MEDIUM" && (
                <span className="badge text-bg-secondary">
                  {task.priorityType}
                </span>
              )}
              {task.priorityType === "NORMAL" && (
                <span className="badge border fw-medium bg-light text-dark rounded fs-6">
                  {task.priorityType}
                </span>
              )}
            </p>
          </li>
          <li className="d-flex gap-2">
            <p style={{ width: "149px" }}>Assignee:</p>
            <p className="bg-body-secondary p-1">{assignedUser?.name}</p>
          </li>
          <li className="d-flex gap-2">
            <p style={{ width: "149px" }}>Status:</p>
            <p>
              {task.closedAt ? (
                <span className={`badge text-bg-success`}>CLOSED</span>
              ) : (
                <span className={`badge text-bg-warning`}>IN_PROGRESS</span>
              )}
            </p>
          </li>
          <li className="d-flex gap-2">
            <p style={{ width: "149px" }}>Created By:</p>
            <p className="bg-body-secondary p-1">{createdByUser?.name}</p>
          </li>
          <li className="d-flex gap-2">
            <p style={{ width: "149px" }}>Pump Type:</p>
            <p>{task.pumpType}</p>
          </li>
          {taskTemplate?.title !== "SERVICE_TASK" ? (
            <>
              <li className="d-flex gap-2">
                <p style={{ width: "149px" }}>Pump Manufacturer:</p>
                <p>{task.pumpManufacturer}</p>
              </li>
              <li className="d-flex gap-2">
                <p style={{ width: "149px" }}>Specifications:</p>
                <p>{task.specifications}</p>
              </li>
            </>
          ) : (
            <li className="d-flex gap-2">
              <p style={{ width: "149px" }}>Problem Description:</p>
              <p>{task.problemDescription}</p>
            </li>
          )}
        </ul>
      </div>
      <div className="py-5">
        <Tabs
          defaultActiveKey="actions"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="actions" title="Actions">
            {taskTemplate && !task.closedAt && (
              <TaskActions
                task={task}
                setTask={setTask as React.Dispatch<React.SetStateAction<Task>>}
                taskTemplate={taskTemplate}
              />
            )}
          </Tab>
          <Tab eventKey="customer" title="Customer Info" className="p-0">
            <CustomerInfo task={task} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
