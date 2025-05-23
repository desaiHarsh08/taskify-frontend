/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnInstance, FieldInstance, FunctionInstance } from "@/lib/task";
import { ColumnTemplate, FieldTemplate } from "@/lib/task-template";
import ColumnCard from "./ColumnCard";
import { useEffect, useState } from "react";
import { updateColumn, uploadFiles } from "@/services/column-apis";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "@/app/slices/loadingSlice";
import { toggleRefetch } from "@/app/slices/refetchSlice";
import Button from "../ui/Button";
import { selectTaskTemplates } from "@/app/slices/taskTemplatesSlice";
import { useAuth } from "@/hooks/useAuth";

// import DepartmentType from "@/lib/department-type";

type EditColumnProps = {
  field: FieldInstance;
  fieldTemplate: FieldTemplate;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  fn: FunctionInstance;
  setFn: React.Dispatch<React.SetStateAction<FunctionInstance | null>>;
};

export default function EditColumn({
  field,
  setOpenEditModal,
  fn,
  setFn,
  fieldTemplate,
}: EditColumnProps) {
  const { user } = useAuth();

  const dispatch = useDispatch();

  const taskTemplates = useSelector(selectTaskTemplates);

  const [tmpField, setTmpField] = useState(field);

  useEffect(() => {
    console.log(taskTemplates);
    // let department: DepartmentType;
    // for (let i = 0; i < taskTemplates.length; i++) {
    //   for (let j = 0; j < taskTemplates[i].functionTemplates.length; j++) {
    //     if (
    //       taskTemplates[i].functionTemplates[j]?.id === fn.functionTemplateId
    //     ) {
    //       department = taskTemplates[i].functionTemplates[j].department;
    //       break;
    //     }
    //   }
    // }
    // console.log(department)
  }, [taskTemplates]);

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

  const handleBoolean = (
    fieldTemplate: FieldTemplate,
    columnTemplate: ColumnTemplate,
    value: boolean
  ) => {
    let tmpFn = { ...fn };

    console.log(value);
    for (let i = 0; i < tmpFn.fieldInstances.length; i++) {
      if (tmpFn.fieldInstances[i].fieldTemplateId === fieldTemplate.id) {
        // Create the follow-ups new-cols
        const newxtFollowUpCols: ColumnInstance[] = [];
        for (
          let j = 0;
          j < tmpFn.fieldInstances[i].columnInstances.length;
          j++
        ) {
          if (
            tmpFn.fieldInstances[i].columnInstances[j].columnTemplateId ==
            columnTemplate.id
          ) {
            // Check
            if (value) {
              tmpFn.fieldInstances[i].columnInstances[j] = {
                ...tmpFn.fieldInstances[i].columnInstances[j],
                booleanValue: true,
              };
              // Create the cols
              const { nextFollowUpColumnTemplates } = columnTemplate;
              if (nextFollowUpColumnTemplates) {
                for (let k = 0; k < nextFollowUpColumnTemplates?.length; k++) {
                  const obj = {
                    booleanValue: false,
                    columnTemplateId:
                      nextFollowUpColumnTemplates[k]
                        .nextFollowUpColumnTemplateId,
                    dateValue: new Date().toString(),
                    numberValue: 0,
                    textValue: "",
                    rowTableInstances: [],
                    columnVariantInstances: [],
                    fieldInstanceId: tmpFn.fieldInstances[i].id,
                    dropdownTemplateId:
                      columnTemplate?.dropdownTemplates?.[0]?.id ?? null,
                  };
                  newxtFollowUpCols.push(obj);
                }
                tmpFn.fieldInstances[i].columnInstances = [
                  ...tmpFn.fieldInstances[i].columnInstances,
                  ...newxtFollowUpCols,
                ];
              }
            } else {
              console.log("in boolean for remove");
              // Uncheck
              tmpFn.fieldInstances[i].columnInstances[j] = {
                ...tmpFn.fieldInstances[i].columnInstances[j],
                booleanValue: false,
              };
              // Remove
              for (
                let j = 0;
                j < tmpFn.fieldInstances[i].columnInstances.length;
                j++
              ) {
                if (
                  tmpFn.fieldInstances[i].columnInstances[j].columnTemplateId ==
                  columnTemplate.id
                ) {
                  const { nextFollowUpColumnTemplates } = columnTemplate;
                  if (nextFollowUpColumnTemplates) {
                    tmpFn.fieldInstances[i].columnInstances =
                      tmpFn.fieldInstances[i].columnInstances.filter(
                        (ele) =>
                          !nextFollowUpColumnTemplates.find(
                            (nxtColTmp) =>
                              nxtColTmp.nextFollowUpColumnTemplateId ==
                              ele.columnTemplateId
                          )
                      );
                  }
                }
              }
            }
          }
        }
      }
    }

    setFn(tmpFn);
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
        console.log("Saved column:", response);
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
              columnIndex={columnIndex}
              column={column}
              fn={fn as FunctionInstance}
              setFn={setFn}
              onColumnChange={handleChangeColumn}
              handleBoolean={handleBoolean}
              fieldTemplate={fieldTemplate}
            />
          ))}
      </div>
      <div className="d-flex justify-content-end mt-4 border-top pt-2">
        <Button
          variant={"success"}
          onClick={handleUpdateColumns}
          disabled={!!field.closedAt && !user?.admin}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
