/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldInstance } from "@/lib/task";
import { ColumnTemplate } from "@/lib/task-template";
import ColumnCard from "./ColumnCard";
import { useState } from "react";
import { updateColumn, uploadFiles } from "@/services/column-apis";
import { useDispatch } from "react-redux";
import { toggleLoading } from "@/app/slices/loadingSlice";
import { toggleRefetch } from "@/app/slices/refetchSlice";
import Button from "../ui/Button";

type EditColumnProps = {
  field: FieldInstance;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditColumn({
  field,
  setOpenEditModal,
}: EditColumnProps) {
  console.log("field:", field);
  const dispatch = useDispatch();

  const [tmpField, setTmpField] = useState(field);

  const handleChangeColumn = (
    columnTemplate: ColumnTemplate,
    value: unknown
  ) => {
    const newTmpField = { ...tmpField };
    newTmpField.columnInstances = newTmpField.columnInstances.map((col) => {
      if (col.columnTemplateId === columnTemplate.id) {
        const newCol = { ...col };
        if (columnTemplate.columnMetadataTemplate.type === "BOOLEAN") {
          newCol.booleanValue = value as boolean;
        } else if (columnTemplate.columnMetadataTemplate.type === "DATE") {
          console.log("to set date:", value);
          newCol.dateValue = dateFormat(value as string);
        } else if (
          columnTemplate.columnMetadataTemplate.type === "TEXT" ||
          columnTemplate.columnMetadataTemplate.type === "LARGE_TEXT" ||
          columnTemplate.columnMetadataTemplate.type === "PHONE" ||
          columnTemplate.columnMetadataTemplate.type === "EMAIL" ||
          columnTemplate.columnMetadataTemplate.type === "TABLE"
        ) {
          newCol.textValue = value as string;
        } else if (columnTemplate.columnMetadataTemplate.type === "FILE") {
          newCol.multipartFiles = value as File[];
        } else if (columnTemplate.columnMetadataTemplate.type === "DROPDOWN") {
          console.log("in dropdown:", value);
          console.log("columnTemplate:", columnTemplate);
          newCol.dropdownTemplateId = Number(value);
          console.log("newCol.dropdownTemplateId:", newCol.dropdownTemplateId);
        } else {
          newCol.numberValue = value as number;
        }

        return newCol;
      }

      return col;
    });

    console.log("newTmpField:", newTmpField);

    setTmpField(newTmpField);
  };

  const dateFormat = (date: string | Date | null) => {
    console.log(date);
    let tmpDate = new Date();
    if (date) {
      tmpDate = new Date(date);
    }
    const formattedDate = `${tmpDate.getFullYear()}-${(tmpDate.getMonth() + 1).toString().padStart(2, "0")}-${tmpDate.getDate().toString().padStart(2, "0")}`;

    console.log(date, "formatted date:", formattedDate);

    return formattedDate;
  };

  const handleUpdateColumns = async () => {
    dispatch(toggleLoading());
    console.log("Updating columns: ", tmpField);
    for (let i = 0; i < tmpField.columnInstances.length; i++) {
      try {
        const response = await updateColumn(tmpField.columnInstances[i]);
        console.log(response);
        const { multipartFiles } = tmpField.columnInstances[i];
        if (multipartFiles && multipartFiles.length > 0) {
          const resUpload = await uploadFiles(
            response,
            tmpField.columnInstances[i].multipartFiles as File[]
          );
          console.log(resUpload);
        }
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(toggleLoading());
    dispatch(toggleRefetch());
    setOpenEditModal(false);
  };

  return (
    <div className="d-flex justify-content-between flex-column">
      <div style={{ height: "400px", overflowY: "auto" }}>
        {tmpField &&
          tmpField.columnInstances &&
          tmpField.columnInstances.map((column, columnIndex) => (
            <ColumnCard
              key={`column-${columnIndex}`}
              column={column}
              onColumnChange={handleChangeColumn}
            />
          ))}
      </div>
      <div className="d-flex justify-content-end mt-4 border-top pt-2">
        <Button
          variant={"success"}
          onClick={handleUpdateColumns}
          disabled={!!field.closedAt}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
