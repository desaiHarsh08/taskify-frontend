import { selectTaskTemplates } from "@/app/slices/taskTemplatesSlice";
import { FunctionInstance } from "@/lib/task";
import {
  ColumnTemplate,
  ColumnVariantTemplate,
  FieldTemplate,
} from "@/lib/task-template";
import { useSelector } from "react-redux";
import ColField from "./ColField";

type FieldCardProps = {
  setNewFunction: React.Dispatch<React.SetStateAction<FunctionInstance | null>>;
  fieldTemplate: FieldTemplate;
  fieldTemplateIndex: number;
  newFunction: FunctionInstance;
  handleCheckBox: (
    fieldTemplate: FieldTemplate,
    columnTemplate: ColumnTemplate,
    value: boolean,
    givenColumnVariantTemplate: ColumnVariantTemplate
  ) => void;
  onFieldChange: (
    fieldTemplate: FieldTemplate,
    columnTemplate: ColumnTemplate,
    value: unknown,
    givenColumnVariantTemplate?: ColumnVariantTemplate | null
  ) => void;
};

export default function FieldCard({
  fieldTemplate,
  fieldTemplateIndex,
  handleCheckBox,
  newFunction,
  setNewFunction,
  onFieldChange,
}: FieldCardProps) {
  const taskTemplates = useSelector(selectTaskTemplates);

  const dateFormat = (date: Date | string | null) => {
    let d = new Date();
    if (date) {
      d = new Date(date);
    }

    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };

  const getColumnTemplateById = (nextFollowUpColTemplateId: number) => {
    console.log("in fn, nextFollowUpColTemplateId:", nextFollowUpColTemplateId);
    for (let i = 0; i < taskTemplates.length; i++) {
      const { functionTemplates } = taskTemplates[i];
      for (let j = 0; j < functionTemplates.length; j++) {
        const { fieldTemplates } = functionTemplates[j];
        for (let k = 0; k < fieldTemplates.length; k++) {
          const { columnTemplates } = fieldTemplates[k];
          for (let l = 0; l < columnTemplates.length; l++) {
            console.log("in loop, columnTemplateId:", columnTemplates[l].id);
            if (columnTemplates[l].id == nextFollowUpColTemplateId) {
              return columnTemplates[l];
            }
          }
        }
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header fw-semibold">
        Field: {fieldTemplate.title}
      </div>
      <div className="card-body">
        <p className="card-text">{fieldTemplate.description}</p>
        {fieldTemplate.columnTemplates.map(
          (columnTemplate, columnTemplateIndex) => (
            <div
              key={`columnTemplate-${columnTemplateIndex}`}
              className="mb-3 d-flex flex-column gap-2"
            >
              <p className="mt-3 my-2">{columnTemplate.name}</p>

              {columnTemplate.columnMetadataTemplate.type === "FILE" && (
                <input
                  type="file"
                  multiple={
                    columnTemplate.columnMetadataTemplate.acceptMultipleFiles
                  }
                  className="form-control"
                  onChange={(e) =>
                    onFieldChange(fieldTemplate, columnTemplate, e.target.files)
                  }
                />
              )}

              {columnTemplate.columnMetadataTemplate.type === "DATE" && (
                <input
                  type="date"
                  className="form-control"
                  value={
                    newFunction.fieldInstances[fieldTemplateIndex]
                      .columnInstances[columnTemplateIndex]?.dateValue ||
                    (dateFormat(null) as string)
                  }
                  onChange={(e) =>
                    onFieldChange(fieldTemplate, columnTemplate, e.target.value)
                  }
                />
              )}

              {(columnTemplate.columnMetadataTemplate.type === "TEXT" ||
                columnTemplate.columnMetadataTemplate.type === "EMAIL" ||
                columnTemplate.columnMetadataTemplate.type === "PHONE") && (
                <input
                  type="text"
                  className="form-control"
                  value={
                    newFunction.fieldInstances[fieldTemplateIndex]
                      .columnInstances[columnTemplateIndex]?.textValue as string
                  }
                  onChange={(e) =>
                    onFieldChange(fieldTemplate, columnTemplate, e.target.value)
                  }
                />
              )}

              {columnTemplate.columnMetadataTemplate.type === "LARGE_TEXT" && (
                <textarea
                  className="form-control"
                  rows={3}
                  value={
                    (newFunction.fieldInstances[fieldTemplateIndex]
                      .columnInstances[columnTemplateIndex]
                      ?.textValue as string) || ""
                  }
                  onChange={(e) =>
                    onFieldChange(fieldTemplate, columnTemplate, e.target.value)
                  }
                ></textarea>
              )}

              {columnTemplate.columnMetadataTemplate.type === "DROPDOWN" &&
                columnTemplate.dropdownTemplates && (
                  <select
                    className="form-control"
                    value={
                      columnTemplate.dropdownTemplates?.find(
                        (ele) =>
                          ele.id ===
                          (newFunction.fieldInstances[fieldTemplateIndex]
                            .columnInstances[columnTemplateIndex]
                            ?.dropdownTemplateId as number)
                      )?.id as number
                    }
                    onChange={(e) =>
                      onFieldChange(
                        fieldTemplate,
                        columnTemplate,
                        e.target.value
                      )
                    }
                  >
                    {columnTemplate.dropdownTemplates &&
                      columnTemplate.dropdownTemplates.map(
                        (dropdownTemplate) => (
                          <option value={dropdownTemplate.id as number}>
                            {dropdownTemplate.value}
                          </option>
                        )
                      )}
                  </select>
                )}

              {(columnTemplate.columnMetadataTemplate.type === "NUMBER" ||
                columnTemplate.columnMetadataTemplate.type === "AMOUNT") && (
                <input
                  type="number"
                  className="form-control"
                  value={
                    newFunction.fieldInstances[fieldTemplateIndex]
                      .columnInstances[columnTemplateIndex]
                      ?.numberValue as number
                  }
                  onChange={(e) =>
                    onFieldChange(fieldTemplate, columnTemplate, e.target.value)
                  }
                />
              )}
              {columnTemplate.columnMetadataTemplate.type === "BOOLEAN" && (
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked={
                      newFunction.fieldInstances[fieldTemplateIndex]
                        .columnInstances[columnTemplateIndex]
                        ?.booleanValue as boolean
                    }
                    onChange={(e) =>
                      onFieldChange(
                        fieldTemplate,
                        columnTemplate,
                        e.target.checked
                      )
                    }
                  />
                </div>
              )}

              {columnTemplate.columnMetadataTemplate.type === "CHECKBOX" &&
                columnTemplate.columnVariantTemplates?.map(
                  (colVariantTemplate, colVariantTemplateIndex) =>
                    newFunction.fieldInstances[fieldTemplateIndex]
                      .columnInstances[columnTemplateIndex]
                      .columnVariantInstances && (
                      <>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={""}
                            checked={
                              newFunction.fieldInstances[
                                fieldTemplateIndex
                              ].columnInstances[
                                columnTemplateIndex
                              ].columnVariantInstances.find(
                                (ele) =>
                                  ele.columnVariantTemplateId ===
                                  colVariantTemplate.id
                              ) != undefined
                            }
                            onChange={(e) =>
                              handleCheckBox(
                                fieldTemplate,
                                columnTemplate,
                                e.target.checked,
                                colVariantTemplate
                              )
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            {colVariantTemplate.name}
                          </label>
                        </div>
                        <div>
                          {newFunction.fieldInstances[
                            fieldTemplateIndex
                          ].columnInstances[
                            columnTemplateIndex
                          ].columnVariantInstances.find(
                            (ele) =>
                              ele.columnVariantTemplateId ===
                              colVariantTemplate.id
                          ) &&
                            colVariantTemplate.nextFollowUpColumnTemplates &&
                            colVariantTemplate.nextFollowUpColumnTemplates.map(
                              (nextFollowUpColTemplate) => {
                                return (
                                  <ColField
                                    fieldTemplateIndex={fieldTemplateIndex}
                                    setNewFunction={setNewFunction}
                                    key={`followUp-${nextFollowUpColTemplate.id}`}
                                    nextFollowUpColTemplateObj={
                                      nextFollowUpColTemplate
                                    }
                                    newFunction={newFunction}
                                  />
                                );
                              }
                            )}
                        </div>
                      </>
                    )
                )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
