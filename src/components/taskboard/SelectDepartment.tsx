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
  "ACCOUNTS",
  "DISPATCH",
  "SERVICE",
  "CUSTOMER",
  "WORKSHOP",
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

  return (
    <div
      style={{ height: "300px" }}
      className="d-flex flex-column justify-content-between"
    >
      <div>
        <p className="my-2 mb-3">Select Department to forward the task</p>
        <select
          value={selectedDepartment}
          onChange={(e) => {
            setSelectedDepartment(e.target.value as DepartmentType);
            const fnTemplateByDept = taskTemplate?.functionTemplates.filter(
              (ele) => ele.department === e.target.value
            );
            if (fnTemplateByDept && setSelectedFunctionTemplate) {
              setSelectedFunctionTemplate(fnTemplateByDept[0]);
              if (handleFunctionDefaultSet) {
                handleFunctionDefaultSet(fnTemplateByDept[0]);
              }
            }
          }}
          className="form-select"
          aria-label="Default select example"
        >
          {departments.map((dept) => {
            if (dept !== "NONE") {
              return (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              );
            }
          })}
        </select>
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
