import DepartmentType from "@/lib/department-type";
import Button from "../ui/Button";
import TaskTemplate, { FunctionTemplate } from "@/lib/task-template";
import { useEffect } from "react";

type SelectFunctionProps = {
  taskTemplate: TaskTemplate;
  selectedFunctionTemplate: FunctionTemplate | null;
  setSelectedFunctionTemplate: React.Dispatch<
    React.SetStateAction<FunctionTemplate | null>
  >;
  selectedDepartment: DepartmentType;
  handleModalNavigate: (
    modalKey:
      | "assignTask"
      | "selectFunction"
      | "inputFunctionDetails"
      | "selectDepartment"
  ) => void;
  onFunctionDefaultSet: (fnPrototype: FunctionTemplate) => void;
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

export default function SelectFunction({
  taskTemplate,
  setSelectedFunctionTemplate,
  handleModalNavigate,
  onFunctionDefaultSet,
  selectedDepartment,
  selectedFunctionTemplate,
}: SelectFunctionProps) {
  let sr = 0;

  useEffect(() => {
    console.log(selectedDepartment);
  }, [selectedDepartment, selectedFunctionTemplate]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTitle = event.target.value;
    const selectedFunction = taskTemplate.functionTemplates.find(
      (fn) => fn.title === selectedTitle && fn.department === selectedDepartment
    );

    console.log("selectedFunction:", selectedFunction);

    onFunctionDefaultSet(selectedFunction as FunctionTemplate);

    setSelectedFunctionTemplate(selectedFunction || null);
  };

  return (
    <div
      className="py-2 d-flex flex-column justify-content-between"
      style={{ height: "400px" }}
    >
      <div>
        <p className="fs-5 mb-3">Select the function</p>
        {/* {console.log(selectedFunctionTemplate)}
        {console.log(TaskTemplate.FunctionTemplates)} */}
        <select
          onChange={handleChange}
          value={selectedFunctionTemplate?.title}
          className="form-select"
          aria-label="Default select example"
        >
          {taskTemplate.functionTemplates.map((fnPrototype) => {
            if (fnPrototype.department == selectedDepartment) {
              sr++;
              return (
                <option key={fnPrototype.title} value={fnPrototype.title}>
                  {/* {sr + 100} */}
                  {(departments.indexOf(fnPrototype.department) + 1) * 100 + sr}
                  <p> - </p>
                  {fnPrototype.title}
                </option>
              );
            }
          })}
        </select>
      </div>
      <div className="d-flex justify-content-end px-2 gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => handleModalNavigate("selectDepartment")}
        >
          Back
        </Button>
        <Button type="button" onClick={() => handleModalNavigate("assignTask")}>
          Next
        </Button>
      </div>
    </div>
  );
}
