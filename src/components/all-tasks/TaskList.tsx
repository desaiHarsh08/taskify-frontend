import TaskRow from "./TaskRow";
import TaskSummary from "@/lib/task-summary";

type TaskListProps = {
  tasks: TaskSummary[];
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
  "Priority",
  "Last Edited",
];

export default function TaskList({
  tasks,
  selectedTasks,
  onSelectTask,
  pageData,
}: TaskListProps) {
  const tableColumns = columns.map((column, index) => {
    let columnWidth = { width: "13%", backgroundColor: "aliceblue" };
    if (index == 0) {
      columnWidth = { ...columnWidth, width: "9%" };
    }

    return (
      <th className="text-center fw-medium border-end py-2" style={columnWidth}>
        {column}
      </th>
    );
  });

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
        <table className="table ">
          <thead>{tableColumns}</thead>
          <tbody>
            {tasks.length > 0 &&
              tasks.map((task, taskIndex) => (
                <TaskRow
                  key={`task-${taskIndex}`}
                  task={task}
                  taskIndex={taskIndex}
                  selectedTasks={selectedTasks}
                  onSelectTask={onSelectTask}
                  pageData={pageData}
                />
              ))}
          </tbody>
        </table>
      </div>
      {tasks.length == 0 && <p className="text-center my-5">No task found!</p>}
      <div className="overflow-y-scroll" style={{ maxHeight: "500px" }}></div>
    </div>
  );
}
