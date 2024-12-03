import DepartmentType from "@/lib/department-type";
import Button from "../ui/Button";
import TaskTemplate, { FunctionTemplate } from "@/lib/task-template";
import { useEffect } from "react";

type SelectDepartmentProps = {
  selectedDepartment: DepartmentType;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<DepartmentType>>;
  onNavigateBackModal?: () => void; // Define the keys in the type
  onNavigateContinueModal: () => void; // Define the keys in the type
  backBtn?: boolean;
  setSelectedFunctionTemplate?: React.Dispatch<
    React.SetStateAction<FunctionTemplate | null>
  >;
  taskTemplate: TaskTemplate | null | undefined;
  handleFunctionDefaultSet?: (fnTemplate: FunctionTemplate) => void;
};

const departments = [
  "QUOTATION",
  "SERVICE",
  "WORKSHOP",
  "ACCOUNTS",
  "DISPATCH",
  "CUSTOMER",
  "NONE",
];

export default function SelectDepartment({
  selectedDepartment,
  setSelectedDepartment,
  onNavigateBackModal,
  onNavigateContinueModal,
  backBtn = true,
  taskTemplate,
  setSelectedFunctionTemplate,
  handleFunctionDefaultSet,
}: SelectDepartmentProps) {
  useEffect(() => {}, [selectedDepartment]);

  const handleDepartmentChange = (dept: DepartmentType) => {
    setSelectedDepartment(dept);
    const fnTemplateByDept = taskTemplate?.functionTemplates.filter(
      (ele) => ele.department === dept
    );
    if (fnTemplateByDept && setSelectedFunctionTemplate) {
      setSelectedFunctionTemplate(fnTemplateByDept[0]);
      if (handleFunctionDefaultSet) {
        handleFunctionDefaultSet(fnTemplateByDept[0]);
      }
    }
  };

  return (
    <div
      style={{ height: "300px" }}
      className="d-flex flex-column justify-content-between"
    >
      <div>
        <p className="my-2 mb-3">Select Department to forward the task</p>
        <div>
          {departments
            .filter((dept) => dept !== "NONE")
            .map((dept) => (
              <div key={dept} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="department"
                  id={dept}
                  value={dept}
                  checked={selectedDepartment === dept}
                  onChange={() =>
                    handleDepartmentChange(dept as DepartmentType)
                  }
                />
                <label className="form-check-label" htmlFor={dept}>
                  {dept}
                </label>
              </div>
            ))}
        </div>
      </div>
      <div className="d-flex justify-content-end p-3 gap-2">
        {backBtn && (
          <Button
            type="button"
            onClick={onNavigateBackModal}
            variant={"secondary"}
          >
            Back
          </Button>
        )}
        <Button type="button" onClick={onNavigateContinueModal}>
          Continue
        </Button>
      </div>
    </div>
  );
}
