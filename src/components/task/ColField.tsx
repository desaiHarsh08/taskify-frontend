import { FunctionInstance, RowTableInstance } from "@/lib/task";
import {
  ColumnTemplate,
  NextFollowUpColumnTemplate,
} from "@/lib/task-template";
import { fetchColumnTemplateById } from "@/services/column-template-apis";
import { useEffect, useState } from "react";
import RTE from "../global/RTE";

type ColFieldProps = {
  newFunction: FunctionInstance;
  setNewFunction: React.Dispatch<React.SetStateAction<FunctionInstance | null>>;
  fieldTemplateIndex: number;
  nextFollowUpColTemplateObj: NextFollowUpColumnTemplate;
};

export default function ColField({
  setNewFunction,
  newFunction,
  nextFollowUpColTemplateObj,
}: ColFieldProps) {
  const [columnTemplate, setColumnTemplate] = useState<ColumnTemplate>();

  useEffect(() => {
    fetchColumnTemplateById(
      nextFollowUpColTemplateObj.nextFollowUpColumnTemplateId as number
    )
      .then((data) => {
        setColumnTemplate(data);
      })
      .catch((err) => console.log("Unable to find the col_template", err));
  }, []);

  useEffect(() => {
    if (columnTemplate) {
      const tmpNewFn = { ...newFunction };
      for (let i = 0; i < tmpNewFn.fieldInstances.length; i++) {
        for (
          let j = 0;
          j < tmpNewFn.fieldInstances[i].columnInstances.length;
          j++
        ) {
          if (columnTemplate.columnVariantTemplates) {
            if (
              tmpNewFn.fieldInstances[i].columnInstances[j]
                .columnVariantInstances
            ) {
              for (
                let k = 0;
                k < columnTemplate.columnVariantTemplates?.length;
                k++
              ) {
                const { nextFollowUpColumnTemplates } =
                  columnTemplate.columnVariantTemplates[k];
                console.log("columnTemplate:", columnTemplate);
                console.log(
                  "tmpNewFn.fieldInstances[i].columnInstances[j]:",
                  tmpNewFn.fieldInstances[i].columnInstances[j]
                );
                if (nextFollowUpColumnTemplates) {
                  for (
                    let m = 0;
                    m < nextFollowUpColumnTemplates?.length;
                    m++
                  ) {
                    console.log(
                      "before if of next cols",
                      nextFollowUpColumnTemplates[m]
                        .nextFollowUpColumnTemplateId
                    );
                    console.log(
                      "before if of coltemplate cols",
                      columnTemplate.id
                    );
                    if (
                      nextFollowUpColumnTemplates[m]
                        .nextFollowUpColumnTemplateId === columnTemplate.id
                    ) {
                      const rowTableInstance: RowTableInstance = {
                        columnInstanceId: tmpNewFn.fieldInstances[i]
                          .columnInstances[j].id as number,
                        colTableInstances: [],
                      };
                      console.log("adding cols");
                      // const { name, targetedValue, valueType, id } = columnTemplate.columnVariantTemplates[k];
                      for (
                        let n = 0;
                        n < columnTemplate.columnVariantTemplates.length;
                        n++
                      ) {
                        rowTableInstance.colTableInstances?.push({
                          booleanValue: false,
                          dateValue: new Date(),
                          textValue: "",
                          columnInstanceId: tmpNewFn.fieldInstances[i]
                            .columnInstances[j].id as number,
                        });
                        tmpNewFn.fieldInstances[i].columnInstances[
                          j
                        ].rowTableInstances.push();
                      }
                    }
                  }
                }
              }
            }
            // }
          }
        }
      }

      console.log("new fn:", tmpNewFn);

      setNewFunction(tmpNewFn);
    }
  }, [columnTemplate]);

  //   const dateFormat = (date: Date | string | null) => {
  //     let d = new Date();
  //     if (date) {
  //       d = new Date(date);
  //     }

  //     return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  //   };

  const getValue = () => {
    let value: unknown;

    for (let i = 0; i < newFunction.fieldInstances.length; i++) {
      for (
        let j = 0;
        j < newFunction.fieldInstances[i].columnInstances.length;
        j++
      ) {
        if (
          columnTemplate?.id ===
          newFunction.fieldInstances[i].columnInstances[j].columnTemplateId
        ) {
          if (columnTemplate?.columnMetadataTemplate.type === "BOOLEAN") {
            return value as boolean;
          } else if (columnTemplate?.columnMetadataTemplate.type === "FILE") {
            return value as File[];
          } else if (
            columnTemplate &&
            ["NUMBER", "AMOUNT"].includes(
              columnTemplate.columnMetadataTemplate.type
            )
          ) {
            return value as number;
          } else if (columnTemplate?.columnMetadataTemplate.type === "DATE") {
            return value as string;
          } else if (
            columnTemplate?.columnMetadataTemplate.type === "DROPDOWN"
          ) {
            return value as number;
          } else {
            return value as string;
          }
        }
      }
    }
  };

  const handleChange = (value: unknown, columnTemplate: ColumnTemplate) => {
    const tmpNewFn = { ...newFunction };
    for (let i = 0; i < tmpNewFn.fieldInstances.length; i++) {
      for (
        let j = 0;
        j < tmpNewFn.fieldInstances[i].columnInstances.length;
        j++
      ) {
        if (
          tmpNewFn.fieldInstances[i].columnInstances[j].columnTemplateId ===
          columnTemplate.id
        ) {
          if (columnTemplate.columnMetadataTemplate.type === "BOOLEAN") {
            tmpNewFn.fieldInstances[i].columnInstances[j].booleanValue =
              value as boolean;
          } else if (columnTemplate.columnMetadataTemplate.type === "FILE") {
            tmpNewFn.fieldInstances[i].columnInstances[j].multipartFiles =
              value as File[];
          } else if (
            ["NUMBER", "AMOUNT"].includes(
              columnTemplate.columnMetadataTemplate.type
            )
          ) {
            tmpNewFn.fieldInstances[i].columnInstances[j].numberValue =
              value as number;
          } else if (columnTemplate.columnMetadataTemplate.type === "DATE") {
            tmpNewFn.fieldInstances[i].columnInstances[j].dateValue =
              value as string;
          } else if (
            columnTemplate.columnMetadataTemplate.type === "DROPDOWN"
          ) {
            tmpNewFn.fieldInstances[i].columnInstances[j].dropdownTemplateId =
              value as number;
          } else {
            tmpNewFn.fieldInstances[i].columnInstances[j].textValue =
              value as string;
          }
        }
      }
    }
  };

//   const handleBoolean = (
//     fieldTemplate: FieldTemplate,
//     columnTemplate: ColumnTemplate,
//     value: boolean
//   ) => {
//     let tmpFn = { ...newFunction };

//     console.log(value);
//     for (let i = 0; i < tmpFn.fieldInstances.length; i++) {
//       if (tmpFn.fieldInstances[i].fieldTemplateId === fieldTemplate.id) {
//         // Create the follow-ups new-cols
//         const newxtFollowUpCols: ColumnInstance[] = [];
//         for (
//           let j = 0;
//           j < tmpFn.fieldInstances[i].columnInstances.length;
//           j++
//         ) {
//           if (
//             tmpFn.fieldInstances[i].columnInstances[j].columnTemplateId ==
//             columnTemplate.id
//           ) {
//             // Check
//             if (value) {
//               tmpFn.fieldInstances[i].columnInstances[j] = {
//                 ...tmpFn.fieldInstances[i].columnInstances[j],
//                 booleanValue: true,
//               };
//               // Create the cols
//               const { nextFollowUpColumnTemplates } = columnTemplate;
//               if (nextFollowUpColumnTemplates) {
//                 for (let k = 0; k < nextFollowUpColumnTemplates?.length; k++) {
//                   const obj = {
//                     booleanValue: false,
//                     columnTemplateId: nextFollowUpColumnTemplates[k].id,
//                     dateValue: new Date().toString(),
//                     numberValue: 0,
//                     textValue: "",
//                     rowTableInstances: [],
//                     columnVariantInstances: [],
//                     fieldInstanceId: tmpFn.fieldInstances[i].id,
//                     dropdownTemplateId:
//                       columnTemplate?.dropdownTemplates?.[0]?.id ?? null,
//                   };
//                   newxtFollowUpCols.push(obj);
//                 }
//                 tmpFn.fieldInstances[i].columnInstances = [
//                   ...tmpFn.fieldInstances[i].columnInstances,
//                   ...newxtFollowUpCols,
//                 ];
//               }
//             } else {
//               console.log("in boolean for remove");
//               // Uncheck
//               tmpFn.fieldInstances[i].columnInstances[j] = {
//                 ...tmpFn.fieldInstances[i].columnInstances[j],
//                 booleanValue: false,
//               };
//               // Remove
//               for (
//                 let j = 0;
//                 j < tmpFn.fieldInstances[i].columnInstances.length;
//                 j++
//               ) {
//                 if (
//                   tmpFn.fieldInstances[i].columnInstances[j].columnTemplateId ==
//                   columnTemplate.id
//                 ) {
//                   const { nextFollowUpColumnTemplates } = columnTemplate;
//                   if (nextFollowUpColumnTemplates) {
//                     tmpFn.fieldInstances[i].columnInstances =
//                       tmpFn.fieldInstances[i].columnInstances.filter(
//                         (ele) =>
//                           !nextFollowUpColumnTemplates.find(
//                             (nxtColTmp) => nxtColTmp.id == ele.columnTemplateId
//                           )
//                       );
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }

//     setNewFunction(tmpFn);
//   };

  return (
    <div className="mx-4">
        in col
      <p>{columnTemplate?.name}</p>
      {columnTemplate?.columnMetadataTemplate.type === "FILE" && (
        <input
          type="file"
          multiple={columnTemplate?.columnMetadataTemplate.acceptMultipleFiles}
          className="form-control"
          onChange={(e) => handleChange(e.target.files, columnTemplate)}
        />
      )}

      {columnTemplate?.columnMetadataTemplate.type === "DROPDOWN" && (
        <div className="mb-3">
          <select
            className="form-select"
            value={getValue() as number}
            onChange={(e) => handleChange(e.target.value, columnTemplate)}
          >
            {columnTemplate.dropdownTemplates?.map((dropdownTemplate) => (
              <option value={dropdownTemplate.id as number}>
                {dropdownTemplate.value}
              </option>
            ))}
          </select>
        </div>
      )}

      {columnTemplate?.columnMetadataTemplate.type === "DATE" && (
        <input
          type="date"
          className="form-control"
          //   value={
          //     // newFunction.fieldInstances[fieldTemplateIndex].columnInstances[
          //     //   columnTemplateIndex
          //     // ]?.dateValue || (dateFormat(null) as string)
          //   }
          value={getValue() as number}
          onChange={(e) => handleChange(e.target.value, columnTemplate)}
        />
      )}

      {(columnTemplate?.columnMetadataTemplate.type === "TEXT" ||
        columnTemplate?.columnMetadataTemplate.type === "EMAIL" ||
        columnTemplate?.columnMetadataTemplate.type === "PHONE") && (
        <input
          type="text"
          className="form-control"
          //   value={
          //     // newFunction.fieldInstances[fieldTemplateIndex].columnInstances[
          //     //   columnTemplateIndex
          //     // ]?.textValue as string
          //   }
          value={getValue() as number}
          onChange={(e) => handleChange(e.target.value, columnTemplate)}
        />
      )}

      {columnTemplate?.columnMetadataTemplate.type === "LARGE_TEXT" && (
        <textarea
          className="form-control"
          rows={3}
          //   value={
          //     // (newFunction.fieldInstances[fieldTemplateIndex].columnInstances[
          //     //   columnTemplateIndex
          //     // ]?.textValue as string) || ""
          //   }
          value={getValue() as number}
          onChange={(e) => handleChange(e.target.value, columnTemplate)}
        ></textarea>
      )}

      {(columnTemplate?.columnMetadataTemplate.type === "NUMBER" ||
        columnTemplate?.columnMetadataTemplate.type === "AMOUNT") && (
        <input
          type="number"
          className="form-control"
          //   value={
          //     // newFunction.fieldInstances[fieldTemplateIndex].columnInstances[
          //     //   columnTemplateIndex
          //     // ]?.numberValue as number
          //   }
          value={getValue() as number}
          onChange={(e) => handleChange(e.target.value, columnTemplate)}
        />
      )}
      
      {columnTemplate?.columnMetadataTemplate.type === "BOOLEAN" && (
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            // checked={
            //   //   newFunction.fieldInstances[fieldTemplateIndex].columnInstances[
            //   //     columnTemplateIndex
            //   //   ]?.booleanValue as boolean
            // }
            value={getValue() as number}
            onChange={(e) => {
              handleChange(e.target.value, columnTemplate);
            }}
          />
        </div>
      )}

      {columnTemplate?.columnMetadataTemplate.type === "TABLE" && (
        <div className="mb-3">
          <RTE
            defaultValue={getValue() as string}
            onChange={(newContent) => handleChange(newContent, columnTemplate)}
          />
        </div>
      )}
    </div>
  );
}
