// import { useAuth } from "@/hooks/useAuth";
import TaskRow from "./TaskRow";
import TaskSummary from "@/lib/task-summary";
// import { useEffect, useState } from "react";
// import { fetchFunctionsByTaskInstanceId } from "@/services/function-apis";
// import { selectTaskTemplates } from "@/app/slices/taskTemplatesSlice";
// import { useSelector } from "react-redux";
// import TaskTemplate from "@/lib/task-template";
// import { Department } from "@/lib/user";

type TaskListProps = {
  tasks: TaskSummary[];
  loading: boolean;
  selectedTasks: TaskSummary[];
  onSelectTask: (task: TaskSummary) => void;
  pageData: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
  };
};

const columns = [
  "Sr. No.",
  "Task Id",
  "Customer",
  "Job Number",
  "Latest Department Name",
  "Latest Function Name",
  "Pump Details",
  "Priority",
  "Last Edited",
];

const columnStyles = [
  { width: "5%" }, // Sr. No.
  { width: "10%" }, // Task Id
  { width: "15%" }, // Customer
  { width: "10%" }, // Job Number
  { width: "12%" }, // Latest Department Name
  { width: "12%" }, // Latest Function Name
  { width: "18%" }, // Pump Details
  { width: "8%" }, // Priority
  { width: "10%" }, // Last Edited
];

export default function TaskList({
  tasks,
  selectedTasks,
  onSelectTask,
  loading,
  pageData,
}: TaskListProps) {
  const tableColumns = columns.map((column, index) => (
    <th
      className="text-center fw-medium border-end py-2"
      style={columnStyles[index]}
    >
      {column}
    </th>
  ));

  return (
    <div
      id="task-table"
      className="table my-3 h-75 w-100 overflow-x-auto border"
    >
      <div
        className="d-flex w-100 bg-light border-bottom-0"
        style={{
          borderBottomColor: "transparent",
          borderBottomRightRadius: "0",
          paddingRight: "14px",
        }}
      >
        <table
          className="table"
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          <thead>{tableColumns}</thead>
          <tbody>
            {tasks.length > 0 &&
              tasks.map((task, taskIndex) => {
                return (
                  <TaskRow
                    key={`task-${taskIndex}`}
                    task={task}
                    taskIndex={taskIndex}
                    selectedTasks={selectedTasks}
                    onSelectTask={onSelectTask}
                    pageData={pageData}
                    columnStyles={columnStyles}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
      {loading && <p className="text-center my-5">Please wait...!</p>}
      {tasks.length == 0 && !loading && (
        <p className="text-center my-5">No task found!</p>
      )}
      <div className="overflow-y-scroll" style={{ maxHeight: "500px" }}></div>
    </div>
  );
}
