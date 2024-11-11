import Task from "@/lib/task";
import Button from "../ui/Button";
import PriorityType from "@/lib/priority-type";

const priorities: PriorityType[] = ["NORMAL", "MEDIUM", "HIGH"];

type SelectTaskTypePriority = {
  setNewTask: React.Dispatch<React.SetStateAction<Task>>;
  onNavigateModal: (
    modalKey: keyof {
      taskType: boolean;
      taskPriority: boolean;
      customer: boolean;
      taskInfo: boolean;
      assignTask: boolean;
    }
  ) => void; // Define the keys in the type
};

export default function SelectTaskPriority({
  onNavigateModal,
  setNewTask,
}: SelectTaskTypePriority) {
  return (
    <div
      style={{ height: "300px" }}
      className="d-flex flex-column justify-content-between"
    >
      <div>
        <p className="my-2 mb-3">Select Task Priority</p>
        <select
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, priorityType: e.target.value as PriorityType }))
          }
          className="form-select"
          aria-label="Default select example"
        >
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex justify-content-end p-3 gap-2">
        <Button
          type="button"
          onClick={() => onNavigateModal("taskType")}
          variant={"secondary"}
        >
          Back
        </Button>
        <Button type="button" onClick={() => onNavigateModal("customer")}>
          Continue
        </Button>
      </div>
    </div>
  );
}
