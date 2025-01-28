import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { selectTaskTemplates } from "@/app/slices/taskTemplatesSlice";
import DepartmentType from "@/lib/department-type";
import { FunctionInstance } from "@/lib/task";

type DoneFieldProps = {
  onContinue: () => void;
  fn: FunctionInstance;
};

export default function DoneField({ onContinue, fn }: DoneFieldProps) {
  const { user } = useAuth();

  const taskTemplates = useSelector(selectTaskTemplates);

  const [disableSaveBtn, setDisableSaveBtn] = useState(false);

  useEffect(() => {
    console.log(taskTemplates);
    let department: DepartmentType;
    for (let i = 0; i < taskTemplates.length; i++) {
      for (let j = 0; j < taskTemplates[i].functionTemplates.length; j++) {
        if (
          taskTemplates[i].functionTemplates[j]?.id === fn.functionTemplateId
        ) {
          department = taskTemplates[i].functionTemplates[j].department;
          break;
        }
      }
    }

    // If user is not an admin, check view tasks for the department
    const isViewTasksAllowed = user?.viewTasks.some(
      (ele) =>
        ele.taskType === department &&
        ele.permissions.some((p) => p.type === "VIEW_ADD_EDIT")
    );

    // Disable the save button if conditions are not met
    if (user && !user.admin && !isViewTasksAllowed) {
      setDisableSaveBtn(true);
    } else {
      setDisableSaveBtn(false); // Enable save button if conditions are met
    }
  }, [taskTemplates]);

  return (
    <div>
      <p className="fs-5 fw-medium mb-2">
        Are you sure that you want to mark this field as done?
      </p>
      <p>This process will not be undone, once marked.</p>
      <div className="mt-5 d-flex justify-content-end">
        <Button onClick={onContinue} disabled={disableSaveBtn}>
          Okay, Proceed
        </Button>
      </div>
    </div>
  );
}
