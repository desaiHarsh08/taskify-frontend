import { ColumnInstance, FieldInstance, FunctionInstance } from "@/lib/task";
import {
  ColumnTemplate,
  ColumnVariantTemplate,
  FieldTemplate,
  FunctionTemplate,
  NextFollowUpColumnTemplate,
} from "@/lib/task-template";
import Button from "../ui/Button";
import FieldCard from "./FieldCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTaskTemplates } from "@/app/slices/taskTemplatesSlice";
// import { File } from "buffer";

type InputFunctionDetailsProps = {
  newFunction: FunctionInstance;
  selectedFunctionTemplate: FunctionTemplate | null;
  setNewFunction: React.Dispatch<React.SetStateAction<FunctionInstance | null>>;
  handleModalNavigate: (
    modalKey: "assignTask" | "selectFunction" | "inputFunctionDetails"
  ) => void;
  onAddFunction: () => Promise<void>;
  onAddAndCloseFunction: () => Promise<void>;
  setSelectedFunctionTemplate: React.Dispatch<
    React.SetStateAction<FunctionTemplate | null>
  >;
  handleFunctionDefaultSet: (fnTemplate: FunctionTemplate) => void;
  loading?: boolean;
};

export default function InputFunctionDetails({
  selectedFunctionTemplate,
  newFunction,
  setNewFunction,
  handleModalNavigate,
  onAddFunction,
  handleFunctionDefaultSet,
  onAddAndCloseFunction,
  loading,
}: InputFunctionDetailsProps) {
  const taskTemplates = useSelector(selectTaskTemplates);
  console.log("in InputFunctionDetails, taskTemplates:", taskTemplates);

  const [selectedFieldTemplate, setSelectedFieldTemplate] =
    useState<FieldTemplate | null>(null);

  useEffect(() => {
    if (selectedFunctionTemplate?.choice) {
      setSelectedFieldTemplate(selectedFunctionTemplate.fieldTemplates[0]);
      const tmpNewFnTemplate = { ...selectedFunctionTemplate };
      tmpNewFnTemplate.fieldTemplates = [
        selectedFunctionTemplate.fieldTemplates[0],
      ];
      handleFunctionDefaultSet(tmpNewFnTemplate);
    }
  }, [selectedFunctionTemplate]);

  const handleFunctionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewFunction((prev) => {
      if (prev) {
        return {
          ...prev,
          functionTemplateId: prev?.functionTemplateId,
          taskInstanceId: prev?.taskInstanceId ?? 0,
          [e.target.name]: e.target.value,
          createdByUserId: prev?.createdByUserId ?? 0,
          fieldInstances: [...prev.fieldInstances],
        };
      } else {
        return newFunction;
      }
    });
  };

  //   const handleFieldChange = (
  //     fieldTemplate: FieldTemplate,
  //     columnTemplate: ColumnTemplate,
  //     value: unknown,
  //     givenColumnVariantTemplate: ColumnVariantTemplate | null = null
  //   ) => {
  //     const tmpNewFn = { ...newFunction };
  //     tmpNewFn.fieldInstances = tmpNewFn.fieldInstances.map((field) => {
  //       if (field.fieldTemplateId === fieldTemplate.id) {
  //         const newField = { ...field };
  //         let nextFollowUpCols: ColumnInstance[] = [];
  //         newField.columnInstances = newField.columnInstances.map((col) => {
  //           if (col.columnTemplateId === columnTemplate.id) {
  //             const newCol = { ...col };
  //             if (columnTemplate.columnMetadataTemplate.type === "BOOLEAN") {
  //               newCol.booleanValue = value as boolean;
  //             } else if (columnTemplate.columnMetadataTemplate.type === "FILE") {
  //               newCol.multipartFiles = value as File[];
  //               console.log("newCol.multipartFiles:", newCol.multipartFiles);
  //               console.log("file:", value);
  //             } else if (
  //               columnTemplate.columnMetadataTemplate.type === "NUMBER" ||
  //               columnTemplate.columnMetadataTemplate.type === "AMOUNT"
  //             ) {
  //               newCol.numberValue = value as number;
  //             } else if (columnTemplate.columnMetadataTemplate.type === "DATE") {
  //               newCol.dateValue = value as string;
  //             } else if (
  //               columnTemplate.columnMetadataTemplate.type === "CHECKBOX"
  //             ) {
  //               console.log("value:", value);
  //               newCol.columnVariantInstances =
  //                 newCol.columnVariantInstances?.map((colVariantInstance) => {
  //                   if (
  //                     colVariantInstance.columnVariantTemplateId ===
  //                     givenColumnVariantTemplate?.id
  //                   ) {
  //                     const newColVariantInstance = { ...colVariantInstance };
  //                     newColVariantInstance.columnVariantTemplateId = value
  //                       ? givenColumnVariantTemplate?.id
  //                       : null;
  //                     if (value) {
  //                       // Add next-follow-up-columns
  //                       if (
  //                         givenColumnVariantTemplate?.nextFollowUpColumnTemplates
  //                       ) {
  //                         nextFollowUpCols = handleAddNextFollowUpColumns(
  //                           givenColumnVariantTemplate,
  //                           newCol.fieldInstanceId as number
  //                         );
  //                       }
  //                     } else {
  //                       // Delete the cols
  //                     }

  //                     return newColVariantInstance;
  //                   }
  //                   return colVariantInstance;
  //                 });
  //             } else if (columnTemplate.columnMetadataTemplate.type === "TABLE") {
  //             } else {
  //               // TEXT, LARGE_TEXT, EMAIL, PHONE
  //               newCol.textValue = value as string;
  //             }

  //             return newCol;
  //           }

  //           return col;
  //         });
  //         for (let i = 0; i < nextFollowUpCols.length; i++) {
  //           newField.columnInstances.push(nextFollowUpCols[i]);
  //         }
  //         console.log("newField:", newField);

  //         return newField;
  //       }

  //       return field;
  //     });

  //     setNewFunction(tmpNewFn);
  //   };

  const handleFieldChange = (
    fieldTemplate: FieldTemplate,
    columnTemplate: ColumnTemplate,
    value: unknown,
    givenColumnVariantTemplates: ColumnVariantTemplate[] | undefined
  ) => {
    const tmpNewFn = { ...newFunction };

    tmpNewFn.fieldInstances = tmpNewFn.fieldInstances.map((field) => {
      if (field.fieldTemplateId === fieldTemplate.id) {
        const newField = { ...field };

        newField.columnInstances = newField.columnInstances.map((col) => {
          if (col.columnTemplateId === columnTemplate.id) {
            const newCol = { ...col };

            if (columnTemplate.columnMetadataTemplate.type === "BOOLEAN") {
              newCol.booleanValue = value as boolean;
            } else if (columnTemplate.columnMetadataTemplate.type === "FILE") {
              newCol.multipartFiles = Array.from(value as FileList);
              console.log(
                "triggered, newCol.multipartFiles:",
                newCol.multipartFiles
              );
            } else if (
              ["NUMBER", "AMOUNT"].includes(
                columnTemplate.columnMetadataTemplate.type
              )
            ) {
              newCol.numberValue = value as number;
            } else if (columnTemplate.columnMetadataTemplate.type === "DATE") {
              newCol.dateValue = value as string;
            } else if (
              columnTemplate.columnMetadataTemplate.type === "DROPDOWN"
            ) {
              newCol.dropdownTemplateId = value as number;
            } else {
              newCol.textValue = value as string;
            }

            return newCol;
          }
          return col;
        });

        return newField;
      }
      return field;
    });

    setNewFunction(tmpNewFn);
  };

  const handleBoolean = (
    fieldTemplate: FieldTemplate,
    columnTemplate: ColumnTemplate,
    value: boolean
  ) => {
    let tmpFn = { ...newFunction };

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
                console.log(
                  "nextFollowUpColumnTemplates:",
                  nextFollowUpColumnTemplates
                );
                for (let k = 0; k < nextFollowUpColumnTemplates?.length; k++) {
                  const obj = {
                    booleanValue: false,
                    columnTemplateId: nextFollowUpColumnTemplates[k].nextFollowUpColumnTemplateId,
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
                            (nxtColTmp) => nxtColTmp.id == ele.columnTemplateId
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

    setNewFunction(tmpFn);
  };

  const handleCheckBox = (
    fieldTemplate: FieldTemplate,
    columnTemplate: ColumnTemplate,
    value: boolean,
    givenColumnVariantTemplate: ColumnVariantTemplate
  ) => {
    console.log("in checkbox, value:", value);
    let tmpFn = { ...newFunction };
    for (let i = 0; i < tmpFn.fieldInstances.length; i++) {
      if (tmpFn.fieldInstances[i].fieldTemplateId === fieldTemplate.id) {
        if (value) {
          // Check
          console.log("in check for add");

          tmpFn.fieldInstances[i] = handleChecked(
            true,
            tmpFn.fieldInstances[i],
            columnTemplate,
            givenColumnVariantTemplate
          );

          // Add follow-ups new-cols
          const newxtFollowUps = handleGetNextFollowUpColumns(
            givenColumnVariantTemplate,
            tmpFn.fieldInstances[i].id as number
          );
          tmpFn.fieldInstances[i].columnInstances.push(...newxtFollowUps);
        } else {
          console.log("in check for remove");
          // Uncheck
          tmpFn.fieldInstances[i] = handleChecked(
            false,
            tmpFn.fieldInstances[i],
            columnTemplate,
            givenColumnVariantTemplate
          );
          //   for (
          //     let j = 0;
          //     j < tmpFn.fieldInstances[i].columnInstances.length;
          //     j++
          //   ) {
          //     tmpFn.fieldInstances[i].columnInstances = tmpFn.fieldInstances[
          //       i
          //     ].columnInstances.map((colInstance) => {
          //       if (colInstance.columnTemplateId === columnTemplate.id) {
          //         const newColInstance = { ...colInstance };
          //         newColInstance.columnVariantInstances =
          //           newColInstance.columnVariantInstances?.map(
          //             (colVariantInstance) => {
          //               if (
          //                 colVariantInstance.columnVariantTemplateId ===
          //                 givenColumnVariantTemplate.id
          //               ) {
          //                 return {
          //                   ...colVariantInstance,
          //                   columnVariantTemplateId: null,
          //                 };
          //               }

          //               return colVariantInstance;
          //             }
          //           );
          //       }
          //       return colInstance;
          //     });
          //   }

          // Remove follow-ups cols
          const { nextFollowUpColumnTemplates } = givenColumnVariantTemplate;
          if (nextFollowUpColumnTemplates) {
            tmpFn.fieldInstances[i].columnInstances =
              handleRemoveNextFollowUpColumns(
                tmpFn.fieldInstances[i].columnInstances,
                nextFollowUpColumnTemplates
              );
          }
        }
      }
    }

    setNewFunction(tmpFn);
  };

  const handleChecked = (
    value: boolean,
    fieldInstance: FieldInstance,
    columnTemplate: ColumnTemplate,
    givenColumnVariantTemplate: ColumnVariantTemplate
  ) => {
    for (let j = 0; j < fieldInstance.columnInstances.length; j++) {
      fieldInstance.columnInstances = fieldInstance.columnInstances.map(
        (colInstance) => {
          if (colInstance.columnTemplateId === columnTemplate.id) {
            const newColInstance = { ...colInstance };
            if (value) {
              newColInstance.columnVariantInstances?.push({
                booleanValue: false,
                columnVariantTemplateId: givenColumnVariantTemplate.id,
                dateValue: new Date(),
                numberValue: 0,
                textValue: "",
              });
            } else {
              console.log("before ", newColInstance.columnVariantInstances);
              console.log(
                `givenColumnVariantTemplate.id: ${givenColumnVariantTemplate.id}`
              );
              newColInstance.columnVariantInstances =
                newColInstance.columnVariantInstances?.filter(
                  (ele) =>
                    ele.columnVariantTemplateId !==
                    givenColumnVariantTemplate.id
                );
              console.log("after ", newColInstance.columnVariantInstances);
            }

            return newColInstance;
          }

          return colInstance;
        }
      );
    }

    return fieldInstance;
  };

  const handleRemoveNextFollowUpColumns = (
    columnInstances: ColumnInstance[],
    nextFollowUpColumnTemplates: NextFollowUpColumnTemplate[]
  ) => {
    const filteredCols = columnInstances.map((col) => {
      if (
        !nextFollowUpColumnTemplates.some(
          (ele) => ele.nextFollowUpColumnTemplateId === col.id
        )
      ) {
        return col;
      }
    }) as ColumnInstance[];

    return filteredCols;
  };

  const handleGetNextFollowUpColumns = (
    givenColumnVariantTemplate: ColumnVariantTemplate,
    fieldInstanceId: number
  ) => {
    const newCols: ColumnInstance[] = [];
    console.log("taskTemplates:", taskTemplates);
    for (let i = 0; i < taskTemplates.length; i++) {
      const { functionTemplates } = taskTemplates[i];
      for (let j = 0; j < functionTemplates.length; j++) {
        const { fieldTemplates } = functionTemplates[j];
        for (let k = 0; k < fieldTemplates.length; k++) {
          const { columnTemplates } = fieldTemplates[k];
          for (let l = 0; l < columnTemplates.length; l++) {
            const { columnVariantTemplates } = columnTemplates[l];
            if (columnVariantTemplates) {
              for (let m = 0; m < columnVariantTemplates?.length; m++) {
                if (
                  givenColumnVariantTemplate.id === columnVariantTemplates[m].id
                ) {
                  const foundColumnTemplate = columnTemplates[l];
                  console.log("foundColumnTemplate:", foundColumnTemplate);
                  if (foundColumnTemplate) {
                    const obj: ColumnInstance = {
                      booleanValue: false,
                      columnTemplateId: columnTemplates[l].id,
                      dateValue: new Date().toString(),
                      numberValue: 0,
                      textValue: "",
                      rowTableInstances: [],
                      columnVariantInstances: [],
                      fieldInstanceId,
                      dropdownTemplateId:
                        columnTemplates[l]?.dropdownTemplates?.[0]?.id ?? null,
                    };
                    if (columnTemplates[l].dropdownTemplates) {
                      const { dropdownTemplates } = columnTemplates[l];
                      if (dropdownTemplates && dropdownTemplates.length > 0) {
                        obj.dropdownTemplateId =
                          (dropdownTemplates[0].id as number) ?? null;
                      }
                    }

                    newCols.push(obj);
                  }
                }
              }
            }
          }
        }
      }
    }

    console.log("newCols:", newCols);

    return newCols;
  };

  const dateFormat = (date: Date | string | null) => {
    let d = new Date();
    if (date) {
      d = new Date(date);
    }

    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const tmpFn = { ...newFunction };

      // Convert FileList to an array and assign it to multipartFiles
      tmpFn.multipartFiles = Array.from(files);

      console.log("Files selected:", tmpFn.multipartFiles);

      setNewFunction(tmpFn);
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: "700px" }}
    >
      <div className="overflow-y-auto" style={{ height: "650px" }}>
        <div className="">
          <h5>Description</h5>
          <p>{selectedFunctionTemplate?.description}</p>
          <span className="badge text-bg-primary my-3">
            {selectedFunctionTemplate?.department}
          </span>
        </div>
        {selectedFunctionTemplate &&
          selectedFunctionTemplate?.dropdownTemplates &&
          selectedFunctionTemplate?.dropdownTemplates.length > 0 && (
            <div className="mb-3">
              <select
                className="form-select"
                value={
                  selectedFunctionTemplate.dropdownTemplates.find(
                    (ele) => ele.id === newFunction.dropdownTemplateId
                  )?.value
                }
                onChange={(e) =>
                  setNewFunction(
                    (prev) =>
                      ({
                        ...prev,
                        dropdownTemplateId: Number(e.target.value),
                      }) as FunctionInstance
                  )
                }
              >
                {selectedFunctionTemplate?.dropdownTemplates.map(
                  (dropdownTemplate) => {
                    return (
                      <option key={dropdownTemplate.value}>
                        {dropdownTemplate.value}
                      </option>
                    );
                  }
                )}
              </select>
            </div>
          )}
        <div className="my-3">
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label my-2">
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              id="dueDate"
              value={
                newFunction.dueDate && dateFormat(newFunction.dueDate as string)
              }
              onChange={handleFunctionChange}
            />
          </div>

          <div className="mb-3 border-bottom">
            {selectedFunctionTemplate?.choice && (
              <select
                className="form-select"
                value={selectedFieldTemplate?.title}
                onChange={(e) => {
                  const fieldProto =
                    selectedFunctionTemplate.fieldTemplates.find(
                      (ele) => ele.title === e.target.value
                    );
                  setSelectedFieldTemplate(fieldProto as FieldTemplate);

                  const tmpNewFnTemplate = { ...selectedFunctionTemplate };
                  tmpNewFnTemplate.fieldTemplates = [
                    fieldProto as FieldTemplate,
                  ];
                  handleFunctionDefaultSet(tmpNewFnTemplate);
                }}
              >
                {selectedFunctionTemplate.fieldTemplates.map(
                  (fieldTemplate, fieldTemplateIndex) => (
                    <option
                      key={`select-field-Template-${fieldTemplateIndex}`}
                      value={fieldTemplate.title}
                    >
                      {fieldTemplate.title}
                    </option>
                  )
                )}
              </select>
            )}
          </div>
          <div className="d-flex flex-column gap-4 py-3">
            {selectedFieldTemplate && selectedFunctionTemplate?.choice && (
              <FieldCard
                handleCheckBox={handleCheckBox}
                setNewFunction={setNewFunction}
                fieldTemplate={selectedFieldTemplate as FieldTemplate}
                fieldTemplateIndex={0}
                newFunction={newFunction}
                onFieldChange={handleFieldChange}
                handleBoolean={handleBoolean}
              />
            )}
            {!selectedFunctionTemplate?.choice &&
              selectedFunctionTemplate?.fieldTemplates.map(
                (fieldTemplate, fieldTemplateIndex) => (
                  <FieldCard
                    handleCheckBox={handleCheckBox}
                    setNewFunction={setNewFunction}
                    key={`fieldTemplate-${fieldTemplateIndex}`}
                    fieldTemplate={fieldTemplate}
                    fieldTemplateIndex={fieldTemplateIndex}
                    newFunction={newFunction}
                    onFieldChange={handleFieldChange}
                    handleBoolean={handleBoolean}
                  />
                )
              )}
          </div>
        </div>
        <div className="border-top mt-5 pt-3">
          <p className="fw-bold fs-4 my-3">Optional Function fields</p>
          <div className="mb-3">
            <label htmlFor="remarks" className="form-label my-2">
              Files
            </label>
            <input
              className="form-control"
              name="fileDirectoryPath"
              onChange={handleFileChange}
              type="file"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="remarks" className="form-label my-2">
              Remarks
            </label>
            <textarea
              className="form-control"
              name="remarks"
              onChange={handleFunctionChange}
              rows={3}
              value={newFunction.remarks}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="border-top align-items-center d-flex justify-content-end gap-2 p-2">
        <Button
          disabled={loading}
          outline
          variant="secondary"
          onClick={() => handleModalNavigate("assignTask")}
        >
          Back
        </Button>
        <Button
          disabled={loading}
          onClick={() => {
            onAddFunction();
          }}
        >
          {loading ? "Adding..." : "Add"}
        </Button>
        <Button
          variant="secondary"
          onClick={onAddAndCloseFunction}
          disabled={loading}
        >
          {loading ? "Please Wait..." : "Completed"}
        </Button>
      </div>
    </div>
  );
}
