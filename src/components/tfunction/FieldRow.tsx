import { FieldInstance } from "@/lib/task";
import FieldActions from "./FieldActions";
import { useEffect, useState } from "react";
import { FieldTemplate } from "@/lib/task-template";
import { fetchFieldTemplateById } from "@/services/field-template-apis";
import { getFormattedDate } from "@/utils/helpers";

type FieldRowProps = {
  field: FieldInstance;
  fieldIndex: number;
};

export default function FieldRow({ field, fieldIndex }: FieldRowProps) {
  const [fieldTemplate, setFieldProtoype] = useState<FieldTemplate | null>(
    null
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchFieldTemplateById(
          field.fieldTemplateId as number
        );
        setFieldProtoype(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    field &&
    fieldTemplate && (
      <div className="d-flex border-bottom">
        <p
          className="d-flex justify-content-center align-items-center border-end"
          style={{ width: "4%" }}
        >
          {fieldIndex + 1}.
        </p>
        <p
          className="d-flex justify-content-center align-items-center border-end"
          style={{ width: "16%" }}
        >
          {fieldTemplate?.title}
        </p>
        <p
          className="d-flex justify-content-center align-items-center border-end"
          style={{ width: "16%" }}
        >
          {fieldTemplate?.description}
        </p>
        <p
          className="d-flex justify-content-center align-items-center border-end"
          style={{ width: "16%" }}
        >
          {getFormattedDate(field.createdAt as string)}
        </p>
        <p
          className="d-flex justify-content-center align-items-center border-end"
          style={{ width: "16%" }}
        >
          {getFormattedDate(field.updatedAt as Date)}
        </p>
        <p
          className="d-flex justify-content-center align-items-center border-end"
          style={{ width: "16%" }}
        >
          {field.closedAt ? (
            <span className="badge text-bg-success">CLOSED</span>
          ) : (
            <span className="badge text-bg-warning">IN_PROGRESS</span>
          )}
        </p>
        <p
          className="d-flex justify-content-center align-items-center"
          style={{ width: "16%" }}
        >
          <FieldActions field={field} fieldTemplate={fieldTemplate} />
        </p>
      </div>
    )
  );
}
