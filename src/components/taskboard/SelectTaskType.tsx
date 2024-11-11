import Button from "../ui/Button";
import Task from "@/lib/task";
import TaskTemplate from "@/lib/task-template";
import { useEffect } from "react";

type SelectTaskTypeProps = {
  newTask: Task;
  setNewTask: React.Dispatch<React.SetStateAction<Task>>;
  taskTemplates: TaskTemplate[];
  onNavigateModal: (
    modalKey: keyof {
      taskType: boolean;
      taskPriority: boolean;
      customer: boolean;
      taskInfo: boolean;
      assignTask: boolean;
    }
  ) => void;
};

export default function SelectTaskType({
  newTask,
  setNewTask,
  taskTemplates,
  onNavigateModal,
}: SelectTaskTypeProps) {
  useEffect(() => {}, [newTask]);
  // Handler for changing the task type
  const handleTaskTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTaskTitle = event.target.value;
    console.log("selectedTaskTitle:", selectedTaskTitle);
    // Find the selected task Templates
    const selectedTemplate = taskTemplates.find(
      (template) => template.title === selectedTaskTitle
    );
    console.log("selectedTemplate:", selectedTemplate);

    if (selectedTemplate && selectedTemplate.id !== undefined) {
      console.log("setting task type");
      // Update the newTask state with the selected task type and other properties
      setNewTask((prevTask) => ({
        ...prevTask,
        taskTemplateId: selectedTemplate.id,
      }));
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: "300px" }}
    >
      <div>
        <p className="my-2 mb-3">Task Type</p>
        <select
          className="form-select"
          aria-label="Default select example"
          value={
            taskTemplates.find(
              (template) => template.id === newTask.taskTemplateId
            )?.title || ""
          }
          onChange={handleTaskTypeChange} // Handle changes
        >
          {taskTemplates.map((taskTemplate) => (
            <option key={taskTemplate.title} value={taskTemplate.title}>
              {taskTemplate.title}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex justify-content-end p-3">
        <Button type="button" onClick={() => onNavigateModal("taskPriority")}>
          Continue
        </Button>
      </div>
    </div>
  );
}
