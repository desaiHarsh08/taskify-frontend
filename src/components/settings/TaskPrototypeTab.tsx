import Button from "../ui/Button";
import { MdDeleteSweep } from "react-icons/md";
import TaskPrototypeRow from "./TaskPrototypeRow";
import CreateTaskPrototype from "./CreateTaskTemplate";

const columns = ["", "#", "Type", "Function Prototype", "Tasks", "Actions"];

export default function TaskPrototypeTab() {
  const tableColumns = columns.map((column, index) => {
    let columnWidth = { width: "21.25%" };
    if (index === 0) {
      columnWidth = { width: "5%" };
    } else if (index === 1) {
      columnWidth = { width: "10%" };
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
    <div className="h-100 py-3">
      <div id="actions" className="d-flex gap-1">
        <CreateTaskPrototype />
        <Button variant="danger" disabled>
          <MdDeleteSweep />
          <span>Delete All</span>
        </Button>
        <Button variant="warning" disabled>
          <span>Select</span>
        </Button>
      </div>
      <div id="task-prototype-table" className="table my-3 h-100">
        <div
          className="d-flex w-100 border bg-light border-bottom-0"
          style={{
            borderBottomColor: "transparent",
            borderBottomRightRadius: "0",
            paddingRight: "14px"
          }}
        >
          {tableColumns}
        </div>
        <div className="border overf low-auto" style={{ height: "500px" }}>
          <TaskPrototypeRow />
        </div>
      </div>
      Pagination
    </div>
  );
}
