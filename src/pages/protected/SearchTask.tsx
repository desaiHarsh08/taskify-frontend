import { toggleLoading } from "@/app/slices/loadingSlice";
import Button from "@/components/ui/Button";
import Task from "@/lib/task";
import TaskTemplate from "@/lib/task-template";
import { fetchTaskByAbbreviation } from "@/services/task-apis";
import { fetchTaskTemplateById } from "@/services/task-template-apis";
import { getFormattedDate } from "@/utils/helpers";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const columns = [
  "",
  "Sr. No.",
  "Task Id",
  "Type",
  "Priority",
  "Created At",
  "Status",
  "Finished",
  "Actions",
];

export default function SearchTask() {
  const dispatch = useDispatch();

  const [searchTxt, setSearchTxt] = useState("");
  const [task, setTask] = useState<Task | null>(null);
  const [taskTemplate, setTaskTemplate] = useState<TaskTemplate | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(toggleLoading());
    try {
      const response = await fetchTaskByAbbreviation(searchTxt);
      console.log(response);
      setTask(response);

      const resProto = await fetchTaskTemplateById(
        response.taskTemplateId as number
      );
      console.log(resProto);
      setTaskTemplate(resProto);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
    }
  };

  //   const getTaskType = async () => {
  //     try {
  //     } catch (error) {}
  //   };

  const tableColumns = columns.map((column, index) => {
    let columnWidth = { width: "12.85%" };
    if (index === 0) {
      columnWidth = { width: "3%" };
    } else if (index === 1) {
      columnWidth = { width: "7%" };
    }

    return (
      <p
        className="text-center fw-medium py-1 m-0 border-end "
        style={columnWidth}
      >
        {column}
      </p>
    );
  });

  return (
    <div className="p-3">
      <h2>Search Task</h2>
      <form className="d-flex gap-2 my-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="type task_id..."
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
          />
        </div>
        <div>
          <Button>Search</Button>
        </div>
      </form>
      {task && (
        <>
          <div
            className="d-flex w-100 border bg-light border-bottom-0"
            style={{
              borderBottomColor: "transparent",
              borderBottomRightRadius: "0",
              //   paddingRight: "14px",
            }}
          >
            {tableColumns}
          </div>
          <div className="overflow-y-scroll">
            <div className="d-flex">
              <p
                className="text-center fw-medium py-1 m-0 border-end "
                style={{ width: "3%" }}
              ></p>
              <p className="border-end text-center" style={{ width: "7%" }}>
                {1}.
              </p>
              <p className="border-end text-center" style={{ width: "13%" }}>
                #{task.abbreviation}
              </p>
              <p className="border-end text-center" style={{ width: "13%" }}>
                {taskTemplate?.title}
              </p>
              <p className="border-end text-center" style={{ width: "13%" }}>
                {task.priorityType === "HIGH" && (
                  <span className="badge bg-danger">{task.priorityType}</span>
                )}
                {task.priorityType === "MEDIUM" && (
                  <span className="badge bg-secondary">
                    {task.priorityType}
                  </span>
                )}
                {task.priorityType === "NORMAL" && (
                  <span className="badge bg-light text-dark border">
                    {task.priorityType}
                  </span>
                )}
              </p>
              <p className="border-end text-center" style={{ width: "13%" }}>
                {getFormattedDate(task.createdDate as Date)}
              </p>
              <p className="border-end text-center" style={{ width: "13%" }}>
                {!task.closedAt ? (
                  <span className="badge bg-warning">IN_PROGRESS</span>
                ) : (
                  <span className="badge bg-success">CLOSED</span>
                )}
              </p>
              <p className="border-end text-center" style={{ width: "13%" }}>
                {task.closedAt
                  ? getFormattedDate(task.closedAt as Date)
                  : "-"}
              </p>
              <p className="border-end text-center" style={{ width: "13%" }}>
                <Link
                  to={`${task.id}`}
                  className="btn btn-primary py-1"
                  style={{ fontSize: "14px" }}
                >
                  View
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
