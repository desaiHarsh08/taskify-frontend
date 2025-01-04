import { ColumnInstance, FunctionInstance } from "@/lib/task";
import {
  ColumnTemplate,
  ColumnVariantTemplate,
  FieldTemplate,
} from "@/lib/task-template";
import ColField from "./ColField";
import RTE from "../global/RTE";
import { useEffect } from "react";

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
    givenColumnVariantTemplates?: ColumnVariantTemplate[]
  ) => void;
  handleBoolean: (
    fieldTemplate: FieldTemplate,
    columnTemplate: ColumnTemplate,
    value: boolean
  ) => void;
};

export default function FieldCard({
  fieldTemplate,
  fieldTemplateIndex,
  handleCheckBox,
  newFunction,
  setNewFunction,
  onFieldChange,
  handleBoolean,
}: FieldCardProps) {
  const dateFormat = (date: Date | string | null) => {
    let d = new Date();
    if (date) {
      d = new Date(date);
    }

    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };

  //   const getColumnTemplateById = (nextFollowUpColTemplateId: number) => {
  //     console.log("in fn, nextFollowUpColTemplateId:", nextFollowUpColTemplateId);
  //     for (let i = 0; i < taskTemplates.length; i++) {
  //       const { functionTemplates } = taskTemplates[i];
  //       for (let j = 0; j < functionTemplates.length; j++) {
  //         const { fieldTemplates } = functionTemplates[j];
  //         for (let k = 0; k < fieldTemplates.length; k++) {
  //           const { columnTemplates } = fieldTemplates[k];
  //           for (let l = 0; l < columnTemplates.length; l++) {
  //             console.log("in loop, columnTemplateId:", columnTemplates[l].id);
  //             if (columnTemplates[l].id == nextFollowUpColTemplateId) {
  //               return columnTemplates[l];
  //             }
  //           }
  //         }
  //       }
  //     }
  //   };

  const getSortedColumnTemplates = () => {
    console.log(fieldTemplate.columnSequences);
    console.log(fieldTemplate.columnTemplates);

    if (
      fieldTemplate.columnSequences &&
      fieldTemplate.columnSequences?.length > 0
    ) {
      console.log(
        fieldTemplate.columnTemplates.filter(
          (ele) =>
            fieldTemplate.columnSequences?.find(
              (seq) => seq.columnTemplateId === ele.id
            ) === undefined
        )
      );
      // Sort the columnTemplates according to the sequence
      const sortedColumnTemplates = [];
      for (let i = 0; i <= fieldTemplate.columnSequences.length; i++) {
        const colSeq = fieldTemplate.columnSequences.find(
          (seq) => seq.sequence == i + 1
        );
        if (colSeq) {
          const colTemp = fieldTemplate.columnTemplates.find(
            (colTemp) => colTemp.id == colSeq.columnTemplateId
          );
          sortedColumnTemplates.push(colTemp);
        }
      }

      // Update the newFunction fieldInstances to match sorted templates
    //   const tmpNewFn = { ...newFunction };
    //   const fieldIndex = fieldTemplateIndex; // Index of the current field template

    //   const updatedColumnInstances = sortedColumnTemplates.map(
    //     (colTemplate) =>
    //       colTemplate &&
    //       tmpNewFn.fieldInstances[fieldIndex].columnInstances.find(
    //         (colInstance) => colInstance.columnTemplateId == colTemplate.id
    //       )
    //   );

    //   // Replace columnInstances in newFunction for the sorted order
    //   tmpNewFn.fieldInstances[fieldIndex].columnInstances =
    //     updatedColumnInstances.filter(Boolean) as ColumnInstance[];

    //   setNewFunction(tmpNewFn); // Ensure state updates with sorted instances
    //   console.log("Updated Function:", tmpNewFn);

      console.log("sortedColumnTemplates:", sortedColumnTemplates);
      return sortedColumnTemplates;
    }

    return fieldTemplate.columnTemplates;
  };

  return (
    <div className="card">
      <div className="card-header fw-semibold">
        Field: {fieldTemplate.title}
      </div>
      <div className="card-body">
        <p className="card-text">{fieldTemplate.description}</p>
        {fieldTemplate.columnTemplates.map(
          (columnTemplate, columnTemplateIndex) => {
            return (
              columnTemplate && (
                <div
                  key={`columnTemplate-${columnTemplateIndex}`}
                  className="mb-3 d-flex flex-column gap-2"
                >
                  <p className="mt-3 my-2">{columnTemplate.name}</p>

                  {columnTemplate.columnMetadataTemplate.type === "FILE" && (
                    <input
                      type="file"
                      accept=".pdf, .doc, .docx, .xls, .xlsx, image/jpeg, image/png"
                      multiple={
                        columnTemplate.columnMetadataTemplate
                          .acceptMultipleFiles
                      }
                      className="form-control"
                      onChange={(e) =>
                        onFieldChange(
                          fieldTemplate,
                          columnTemplate,
                          e.target.files
                        )
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
                        onFieldChange(
                          fieldTemplate,
                          columnTemplate,
                          e.target.value
                        )
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
                          .columnInstances[columnTemplateIndex]
                          ?.textValue as string
                      }
                      onChange={(e) =>
                        onFieldChange(
                          fieldTemplate,
                          columnTemplate,
                          e.target.value
                        )
                      }
                    />
                  )}

                  {columnTemplate.columnMetadataTemplate.type ===
                    "LARGE_TEXT" && (
                    <textarea
                      className="form-control"
                      rows={3}
                      value={
                        (newFunction.fieldInstances[fieldTemplateIndex]
                          .columnInstances[columnTemplateIndex]
                          ?.textValue as string) || ""
                      }
                      onChange={(e) =>
                        onFieldChange(
                          fieldTemplate,
                          columnTemplate,
                          e.target.value
                        )
                      }
                    ></textarea>
                    // <RTE
                    //   defaultValue={
                    //     (newFunction.fieldInstances[fieldTemplateIndex]
                    //       .columnInstances[columnTemplateIndex]
                    //       ?.textValue as string) || ""
                    //   }
                    //   onChange={(newContent) => {
                    //     console.log("newContent:", newContent);
                    //     onFieldChange(fieldTemplate, columnTemplate, newContent);
                    //   }}
                    // />
                  )}

                  {columnTemplate.columnMetadataTemplate.type === "TABLE" && (
                    <RTE
                      defaultValue={
                        (newFunction.fieldInstances[fieldTemplateIndex]
                          .columnInstances[columnTemplateIndex]
                          ?.textValue as string) || ""
                      }
                      onChange={(newContent) => {
                        console.log("newContent:", newContent);
                        onFieldChange(
                          fieldTemplate,
                          columnTemplate,
                          newContent
                        );
                      }}
                    />
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
                    columnTemplate.columnMetadataTemplate.type ===
                      "AMOUNT") && (
                    <input
                      type="number"
                      className="form-control"
                      value={
                        newFunction.fieldInstances[fieldTemplateIndex]
                          .columnInstances[columnTemplateIndex]
                          ?.numberValue as number
                      }
                      onChange={(e) =>
                        onFieldChange(
                          fieldTemplate,
                          columnTemplate,
                          e.target.value
                        )
                      }
                    />
                  )}

                  {columnTemplate.columnMetadataTemplate.type === "CHECKBOX" &&
                    columnTemplate.columnVariantTemplates?.map(
                      (colVariantTemplate) =>
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

                  {columnTemplate.columnMetadataTemplate.type === "BOOLEAN" && (
                    <>
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
                            handleBoolean(
                              fieldTemplate,
                              columnTemplate,
                              Boolean(e.target.checked)
                            )
                          }
                        />
                      </div>
                      {(newFunction.fieldInstances[fieldTemplateIndex]
                        .columnInstances[columnTemplateIndex]
                        ?.booleanValue as boolean) &&
                        columnTemplate.nextFollowUpColumnTemplates?.map(
                          (
                            nextFollowUpColTemplate,
                            nextFollowUpColTemplateIndex
                          ) => (
                            <ColField
                              key={`nextFollowUpColTemplate-${nextFollowUpColTemplateIndex}`}
                              fieldTemplateIndex={fieldTemplateIndex}
                              newFunction={newFunction}
                              nextFollowUpColTemplateObj={
                                nextFollowUpColTemplate
                              }
                              setNewFunction={setNewFunction}
                            />
                          )
                        )}
                    </>
                  )}
                </div>
              )
            );
          }
        )}
      </div>
    </div>
  );
}
