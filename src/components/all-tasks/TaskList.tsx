// import Task from "@/lib/task";
// import TaskRow from "./TaskRow";

// type TaskListProps = {
//   tasks: Task[];
//   selectedTasks: Task[];
//   onSelectTask: (task: Task) => void;
//   pageData: {
//     pageNumber: number;
//     pageSize: number;
//     totalPages: number;
//     totalRecords: number;
//   };
// };

// const columns = [
//   "Sr. No.",
//   "Task Id",
//   "Customer",
//   "Job No.",
//   "Department",
//   "Function",
//   "Priority",
//   "Last Edited",
// ];

// export default function TaskList({
//   tasks,
//   selectedTasks,
//   onSelectTask,
//   pageData,
// }: TaskListProps) {
//   const tableColumns = columns.map((column, index) => {
//     let columnWidth = { width: "13%" };
//     if (index === 0) {
//       columnWidth = { width: "9%" };
//     }

//     return (
//       <p
//         className="text-center fw-medium py-1 m-0 border-end "
//         style={columnWidth}
//       >
//         {column}
//       </p>
//     );
//   });

//   return (
//     <div
//       id="task-table"
//       className="table my-3 h-75 w-100 overflow-x-auto border"
//     >
//       <div
//         className="d-flex w-100 border bg-light border-bottom-0"
//         style={{
//           borderBottomColor: "transparent",
//           borderBottomRightRadius: "0",
//           paddingRight: "14px",
//         }}
//       >
//         {tableColumns}
//       </div>
//       <div className="overflow-y-scroll" style={{ maxHeight: "500px" }}>
//         {tasks.map((task, taskIndex) => (
//           <TaskRow
//             key={`task-${taskIndex}`}
//             task={task}
//             taskIndex={taskIndex}
//             selectedTasks={selectedTasks}
//             onSelectTask={onSelectTask}
//             pageData={pageData}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

import Task from "@/lib/task";
import TaskRow from "./TaskRow";

type TaskListProps = {
  tasks: Task[];
  selectedTasks: Task[];
  onSelectTask: (task: Task) => void;
  pageData: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
  };
};

const columns = [
  "",
  "Sr. No.",
  "Task Id",
  "Type",
  "Priority",
  "Department",
  "Last Edited",
  "Status",
  "Finished",
  "Actions",
];

export default function TaskList({
  tasks,
  selectedTasks,
  onSelectTask,
  pageData,
}: TaskListProps) {
  const tableColumns = columns.map((column, index) => {
    let columnWidth = { width: "11.25%" };
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
    <div
      id="task-table"
      className="table my-3 h-75 w-100 overflow-x-auto border"
    >
      <div
        className="d-flex w-100 border bg-light border-bottom-0"
        style={{
          borderBottomColor: "transparent",
          borderBottomRightRadius: "0",
          paddingRight: "14px",
        }}
      >
        {tableColumns}
      </div>
      <div className="overflow-y-scroll" style={{ maxHeight: "500px" }}>
        {tasks.map((task, taskIndex) => (
          <TaskRow
            key={`task-${taskIndex}`}
            task={task}
            taskIndex={taskIndex}
            selectedTasks={selectedTasks}
            onSelectTask={onSelectTask}
            pageData={pageData}
          />
        ))}
      </div>
    </div>
  );
}
