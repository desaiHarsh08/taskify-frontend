import Task from "@/lib/task";
import FunctionCard from "./FunctionCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectRefetch } from "@/app/slices/refetchSlice";

type FunctionsListProps = {
  task: Task;
};

export default function FunctionsList({ task }: FunctionsListProps) {
  const refetchFlag = useSelector(selectRefetch);

  useEffect(() => {
  }, [refetchFlag, task, task.functionInstances]);

  return (
    <div id="function-container" className="py-4 overflow-auto pb-5">
      <div
        className="d-flex border bg-light fw-medium text-center"
        style={{ minWidth: "948px" }}
      >
        <p className="border-end py-1" style={{ width: "7%" }}>
          Sr. No.
        </p>
        <p className="border-end py-1" style={{ width: "15.5%" }}>
          Function
        </p>
        <p className="border-end py-1" style={{ width: "15.5%" }}>
          Department
        </p>
        <p className="border-end py-1" style={{ width: "15.5%" }}>
          Created At
        </p>
        <p className="border-end py-1" style={{ width: "15.5%" }}>
          Due Date
        </p>
        <p className="border-end py-1" style={{ width: "15.5%" }}>
          Last Edited
        </p>
        <p className="py-1" style={{ width: "15.5%" }}>
          Closed At
        </p>
      </div>
      <div className="w-100 border" style={{ minWidth: "948px" }}>
        {task.functionInstances?.map((fn, fnIndex) => (
          <FunctionCard
            key={`fn-${fnIndex}`}
            task={task}
            srno={(task.functionInstances?.length as number) - fnIndex}
            fn={fn}
            fnIndex={fnIndex}
          />
        ))}
      </div>
    </div>
  );
}
