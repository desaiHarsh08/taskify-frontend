import Task from "@/lib/task";
import { FunctionInstance } from "@/lib/task";
import { FunctionTemplate } from "@/lib/task-template";
import { fetchFunctionTemplateById } from "@/services/function-template-apis";
import { getFormattedDate } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type FunctionCardProps = {
  fn: FunctionInstance;
  srno: number;
  task: Task;
};

export default function FunctionCard({
  fn,
  srno,
}: FunctionCardProps) {
  const [functionTemplate, setfunctionTemplate] =
    useState<FunctionTemplate | null>(null);

  const setLastEdited = useState<Date | string | null>(null)[1];

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchFunctionTemplateById(
          fn.functionTemplateId as number
        );
        setfunctionTemplate(response);
      } catch (error) {
        console.log(error);
      }
    })();

    const lastEditedField = fn.fieldInstances.find(
      (field) => !field.closedAt == null
    );
    setLastEdited(lastEditedField?.updatedAt as Date);
  }, [fn.fieldInstances, fn.functionTemplateId]);

  return (
    <Link
      to={`${fn.id}`}
      className={`d-flex w-100 text-dark border-bottom text-center`}
      style={{
        fontSize: "12px",
        textDecoration: "none",
        backgroundColor: !fn.closedAt ? "#bcfddf" : "",
      }}
    >
      <p className="border-end py-2 px-1" style={{ width: "7%" }}>
        {srno}
      </p>
      <p className="border-end py-2 px-1" style={{ width: "15.5%" }}>
        {functionTemplate?.title}
      </p>
      <p className="border-end py-2 px-1" style={{ width: "15.5%" }}>
        {functionTemplate?.department}
      </p>
      <p className="border-end py-2 px-1" style={{ width: "15.5%" }}>
        {getFormattedDate(fn.createdAt as Date)}
      </p>
      <p className="border-end py-2 px-1" style={{ width: "15.5%" }}>
        {getFormattedDate(fn.dueDate as Date)}
      </p>
      <p className="border-end py-2 px-1" style={{ width: "15.5%" }}>
        {getFormattedDate(fn.updatedAt as Date)}
      </p>
      <p className="py-2 px-1" style={{ width: "15.5%" }}>
        {fn.closedAt && fn.closedAt ? getFormattedDate(fn.closedAt) : "-"}
      </p>
    </Link>
  );
}
