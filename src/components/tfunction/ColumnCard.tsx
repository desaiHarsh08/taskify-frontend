import { ColumnInstance, FunctionInstance } from "@/lib/task";
import { ColumnTemplate, FieldTemplate } from "@/lib/task-template";
import { fetchColumnTemplateById } from "@/services/column-template-apis";
import { useEffect, useState } from "react";
import { fetchFile } from "@/services/column-apis";
import RTE from "../global/RTE";
import ColField from "../task/ColField";
import { useSelector } from "react-redux";
import { selectTaskTemplates } from "@/app/slices/taskTemplatesSlice";
// import ColField from "../task/ColField";

type ColumnCardProps = {
  fn: FunctionInstance;
  fieldTemplate: FieldTemplate;
  setFn: React.Dispatch<React.SetStateAction<FunctionInstance | null>>;
  column: ColumnInstance;
  onColumnChange: (columnTemplate: ColumnTemplate, value: unknown) => void;
  handleBoolean: (
    fieldTemplate: FieldTemplate,
    columnTemplate: ColumnTemplate,
    value: boolean
  ) => void;
  columnIndex: number;
};

export default function ColumnCard({
  fn,
  setFn,
  column,
  onColumnChange,
  columnIndex,
  handleBoolean,
  fieldTemplate,
}: ColumnCardProps) {
  const taskTemplates = useSelector(selectTaskTemplates);

  const [fieldTemplateIndex, setFieldTemplateIndex] = useState<number | null>();
  const [columnTemplate, setColumnTemplate] = useState<ColumnTemplate | null>(
    null
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchColumnTemplateById(
          column.columnTemplateId as number
        );
        for (let i = 0; i < taskTemplates.length; i++) {
          for (let j = 0; j < taskTemplates[i].functionTemplates.length; j++) {
            for (
              let k = 0;
              k < taskTemplates[i].functionTemplates[j].fieldTemplates.length;
              k++
            ) {
              if (
                fieldTemplate.id ==
                taskTemplates[i].functionTemplates[j].fieldTemplates[k].id
              ) {
                setFieldTemplateIndex(k);
              }
            }
          }
        }
        setColumnTemplate(response);
      } catch (error) {
        console.log(error);
      }
    })();
    console.log("column:", column);
  }, [column.dropdownTemplateId]);

  const handleFileView = async (filePath: string) => {
    try {
      const response = await fetchFile(filePath);
      const blob = new Blob([response], { type: response.type });
      const url = window.URL.createObjectURL(blob);

      // Open or download depending on the MIME type
      if (blob.type.startsWith("image/") || blob.type === "application/pdf") {
        // Open in a new tab for images and PDFs
        window.open(url, "_blank");
      } else {
        // Download for other file types
        const a = document.createElement("a");
        a.href = url;
        a.download = filePath.split("/").pop() as string; // Extract file name from the path
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      // Revoke the object URL after usage
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching the file:", error);
    }
  };

  const dateFormat = (date: string | Date | null) => {
    let tmpDate = new Date();
    if (date) {
      tmpDate = new Date(date);
    }
    const formattedDate = `${tmpDate.getFullYear()}-${(tmpDate.getMonth() + 1).toString().padStart(2, "0")}-${tmpDate.getDate().toString().padStart(2, "0")}`;

    return formattedDate;
  };

  return (
    columnTemplate &&
    column && (
      <div>
        <div className="mb-3 d-flex flex-column gap-2">
          <p className="mt-3 my-2">
            {columnTemplate.name}
          </p>
          {columnTemplate.columnMetadataTemplate.type === "FILE" && (
            <>
              <input
                type="file"
                accept=".pdf, .doc, .docx, .xls, .xlsx, image/jpeg, image/png"
                multiple={
                  columnTemplate.columnMetadataTemplate.acceptMultipleFiles
                }
                className="form-control"
                onChange={(e) => onColumnChange(columnTemplate, e.target.files)}
              />
            </>
          )}

          {column.filePaths &&
            column.filePaths.map((filePath) => {
              const fileName = filePath.substring(
                filePath.lastIndexOf("/") + 1
              );
              const parts = filePath.split(".");
              const fileExtension = parts[parts.length - 1];
              let fileLogo = "/file-logo-img.jpeg";
              if (fileExtension.toLowerCase() === "xlsx") {
                fileLogo = "/excel-logo-img.png";
              } else if (fileExtension.toLowerCase() === "pdf") {
                fileLogo = "/pdf-logo-img.png";
              } else if (
                fileExtension.toLowerCase() === "word" ||
                fileExtension.toLowerCase() === "docx"
              ) {
                fileLogo = "/word-logo-img.avif";
              }

              return (
                <div
                  className="d-flex my-3"
                  onClick={() => handleFileView(filePath)}
                >
                  <div className="p-2" style={{ cursor: "pointer" }}>
                    <img
                      src={fileLogo}
                      alt=""
                      width={70}
                      style={{ border: "1px solid #bcbcbc" }}
                    />
                    <p>{fileName}</p>
                  </div>
                </div>
              );
            })}

          {columnTemplate.columnMetadataTemplate.type === "DATE" && (
            <input
              type="date"
              className="form-control"
              value={dateFormat(column.dateValue as string)}
              onChange={(e) => onColumnChange(columnTemplate, e.target.value)}
            />
          )}

          {columnTemplate.columnMetadataTemplate.type === "LARGE_TEXT" && (
            <textarea
              className="form-control"
              rows={3}
              value={column.textValue as string}
              onChange={(e) => onColumnChange(columnTemplate, e.target.value)}
            ></textarea>
          )}

          {columnTemplate.columnMetadataTemplate.type === "TABLE" && (
            <RTE
              defaultValue={column.textValue as string}
              onChange={(newContent) => {
                console.log("newContent:", newContent);
                onColumnChange(columnTemplate, newContent);
              }}
            />
          )}

          {(columnTemplate.columnMetadataTemplate.type === "TEXT" ||
            columnTemplate.columnMetadataTemplate.type === "PHONE" ||
            columnTemplate.columnMetadataTemplate.type === "EMAIL") && (
            <input
              type="text"
              className="form-control"
              value={column.textValue as string}
              onChange={(e) => onColumnChange(columnTemplate, e.target.value)}
            />
          )}

          {(columnTemplate.columnMetadataTemplate.type === "NUMBER" ||
            columnTemplate.columnMetadataTemplate.type === "AMOUNT") && (
            <input
              type="number"
              className="form-control"
              value={column.numberValue as number}
              onChange={(e) => onColumnChange(columnTemplate, e.target.value)}
            />
          )}

          {columnTemplate.columnMetadataTemplate.type === "DROPDOWN" && (
            <select
              className="form-select"
              value={column.dropdownTemplateId as number}
              onChange={(e) => onColumnChange(columnTemplate, e.target.value)}
            >
              {columnTemplate.dropdownTemplates &&
                columnTemplate.dropdownTemplates.map((dropdownTemplate) => (
                  <option value={dropdownTemplate.id as number}>
                    {dropdownTemplate.value}
                  </option>
                ))}
            </select>
          )}

          {columnTemplate.columnMetadataTemplate.type === "CHECKBOX" &&
            fieldTemplateIndex &&
            columnTemplate.columnVariantTemplates &&
            columnTemplate.columnVariantTemplates?.length > 0 &&
            columnTemplate.columnVariantTemplates?.map(
              (colVariantTemplate) =>
                fn.fieldInstances[fieldTemplateIndex].columnInstances[
                  columnIndex
                ].columnVariantInstances && (
                  <>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={""}
                        checked={
                          fn.fieldInstances[fieldTemplateIndex].columnInstances[
                            columnIndex
                          ].columnVariantInstances.find(
                            (ele) =>
                              ele.columnVariantTemplateId ===
                              colVariantTemplate.id
                          ) != undefined
                        }
                        onChange={() => {}}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        {colVariantTemplate.name}
                      </label>
                    </div>
                    <div>
                      {fn.fieldInstances[fieldTemplateIndex].columnInstances[
                        columnIndex
                      ].columnVariantInstances.find(
                        (ele) =>
                          ele.columnVariantTemplateId === colVariantTemplate.id
                      ) &&
                        colVariantTemplate.nextFollowUpColumnTemplates &&
                        colVariantTemplate.nextFollowUpColumnTemplates.map(
                          (nextFollowUpColTemplate) => {
                            return (
                              <ColField
                                fieldTemplateIndex={fieldTemplateIndex}
                                setNewFunction={setFn}
                                key={`followUp-${nextFollowUpColTemplate.id}`}
                                nextFollowUpColTemplateObj={
                                  nextFollowUpColTemplate
                                }
                                newFunction={fn}
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
                  checked={column.booleanValue as boolean}
                  onChange={(e) =>
                    //   onColumnChange(columnTemplate, e.target.checked)
                    handleBoolean(
                      fieldTemplate,
                      columnTemplate,
                      Boolean(e.target.value)
                    )
                  }
                />
              </div>
as
              {column.booleanValue &&
                fieldTemplateIndex && columnTemplate.nextFollowUpColumnTemplates ?
                columnTemplate.nextFollowUpColumnTemplates?.map(
                  (nextFollowUpColTemplate, nextFollowUpColTemplateIndex) => (
                    <ColField
                      key={`nextFollowUpColTemplate-${nextFollowUpColTemplateIndex}`}
                      fieldTemplateIndex={fieldTemplateIndex}
                      newFunction={fn}
                      nextFollowUpColTemplateObj={nextFollowUpColTemplate}
                      setNewFunction={setFn}
                    />
                  )
                ) : null}
                
            </>
          )}
        </div>
      </div>
    )
  );
}
