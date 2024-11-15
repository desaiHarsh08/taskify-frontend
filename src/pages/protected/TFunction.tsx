/* eslint-disable @typescript-eslint/no-unused-vars */
import { toggleLoading } from "@/app/slices/loadingSlice";
import { selectRefetch, toggleRefetch } from "@/app/slices/refetchSlice";
import InputFunctionDetails from "@/components/task/InputFunctionDetails";

import FieldRow from "@/components/tfunction/FieldRow";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import MyToast from "@/components/ui/MyToast";
import { useAuth } from "@/hooks/useAuth";
import { FieldInstance, FunctionInstance } from "@/lib/task";
import { FunctionTemplate } from "@/lib/task-template";
import { closeField, createField } from "@/services/field-apis";
import {
  doCloseFunction,
  fetchFile,
  fetchFunctionById,
  updateFunction,
  uploadFiles,
} from "@/services/function-apis";
import { fetchFunctionTemplateById } from "@/services/function-template-apis";
import { getFormattedDate } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const columns = [
  "Sr. No.",
  "Title",
  "Description",
  "Created At",
  "Last Edited",
  "Status",
  "Actions",
];

export default function TFunction() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { functionId } = useParams();

  const refetchFlag = useSelector(selectRefetch);

  const [openAddSubFunction, setOpenAddSubFunction] = useState(false);
  const [fn, setFn] = useState<FunctionInstance | null>(null);
  const [fnBkp, setFnBkp] = useState<FunctionInstance | null>(null);
  const [fnTemplate, setFnTemplate] = useState<FunctionTemplate | null>(null);
  const [flag, setFlag] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [openDoneFn, setOpenDoneFn] = useState(false);
  const [showMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    console.log("refetchFlag:", refetchFlag);
    getFn();
  }, [functionId, refetchFlag, flag]);

  const getFn = async () => {
    console.log("get fn:");
    try {
      const response = await fetchFunctionById(Number(functionId));
      console.log("fetching fn:", response);

      const responseProto = await fetchFunctionTemplateById(
        response.functionTemplateId as number
      );

      setFn(response);
      setFnBkp(response);
      setFnTemplate(responseProto);
    } catch (error) {
      console.log(error);
    }
  };

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

  const updateFn = async () => {
    if (!user) {
      return;
    }
    dispatch(toggleLoading());
    try {
      const { multipartFiles, ...tmpFn } = fn as FunctionInstance;
      console.log(fn);
      console.log(multipartFiles);
      console.log("updating fn:", tmpFn);
      const resUpdateFn = await updateFunction(
        fn as FunctionInstance,
        user.id as number
      );
      console.log("updated fn fields, resUpdateFn:", resUpdateFn);
      try {
        console.log("files:", files);
        await uploadFiles(resUpdateFn, files as File[]);
        console.log("uploaded files");
      } catch (error) {
        console.log("unable to upload files", error);
      }
    } catch (error) {
      console.log("unable to update fn", error);
    } finally {
      dispatch(toggleRefetch());
      dispatch(toggleLoading());
    }
  };

  const handleCloseFn = async () => {
    console.log(user);
    dispatch(toggleLoading());
    try {
      await doCloseFunction(
        fn as FunctionInstance,
        fn?.id as number,
        user?.id as number
      );
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
      dispatch(toggleRefetch());
      setOpenDoneFn(false);
    }
  };

  const handleFunctionDefaultSet = (FunctionTemplate: FunctionTemplate) => {
    console.log("called fnDefaultSet:");
    const tmpNewFn: FunctionInstance = { ...fnBkp } as FunctionInstance;

    // Set the fields
    const tmpFields: FieldInstance[] = [];
    for (let i = 0; i < FunctionTemplate.fieldTemplates.length; i++) {
      const fieldTemplate = FunctionTemplate.fieldTemplates[i];
      const field: FieldInstance = {
        fieldTemplateId: fieldTemplate.id as number,
        createdByUserId: user?.id,
        columnInstances: [],
        functionInstanceId: fn?.id,
      };
      for (let j = 0; j < fieldTemplate.columnTemplates.length; j++) {
        const columnTemplate = fieldTemplate.columnTemplates[j];
        field.columnInstances.push({
          columnTemplateId: columnTemplate.id,
          columnVariantInstances: [],
          rowTableInstances: [],
          numberValue: 0,
          textValue: "",
          dateValue: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`,
          booleanValue: false,
          dropdownTemplateId:
            columnTemplate.dropdownTemplates &&
            columnTemplate.dropdownTemplates.length > 0
              ? (columnTemplate.dropdownTemplates[0]?.id as number)
              : null,
        });
      }
      tmpFields.push(field);
    }

    console.log("tmpFields:", tmpFields);

    tmpNewFn.fieldInstances = [...tmpNewFn.fieldInstances, ...tmpFields];

    console.log("Default set newFn:", tmpNewFn);
    setFn(tmpNewFn);
  };

  const handleAddSubFunction = async () => {
    if (!fn) {
      return;
    }
    console.log(fn);
    dispatch(toggleLoading());
    for (let i = 0; i < fn?.fieldInstances.length; i++) {
      console.log(`field-${i + 1}:`, fn.fieldInstances[i]);
      if (fn.fieldInstances[i].id) {
        continue;
      }
      try {
        const response = await createField(fn.fieldInstances[i]);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    console.log("field is added!");
    console.log("fn:", fn);
    setFlag((prev) => !prev);
    getFn();
    dispatch(toggleLoading());
    setOpenAddSubFunction(false);
    dispatch(toggleRefetch());
  };

  const functionDetails = (
    <div className="mb-4">
      <div className="border-bottom pb-3 mb-3">
        <h2 className="d-sm-flex align-items-center gap-2">
          <p className="bg-body-secondary py-1 px-2 rounded">
            {fnTemplate?.title}
          </p>
        </h2>
        <span className="badge text-bg-primary">{fnTemplate?.department}</span>
      </div>
      {!fn?.closedAt && (
        <p className="mb-3">
          <Button
            outline
            variant={"secondary"}
            disabled={fn?.fieldInstances.some((field) => !field.closedAt)}
            onClick={() => setOpenDoneFn(true)}
          >
            Done
          </Button>
          <Modal
            open={openDoneFn}
            onHide={() => setOpenDoneFn(false)}
            backdrop
            centered
            size="lg"
            heading={
              <div className="d-flex align-items-center gap-2">
                <p>Done</p>
                <p className="text-bg-secondary badge">{fnTemplate?.title}</p>
              </div>
            }
          >
            <p className="fs-5 fw-medium mb-2">
              Are you sure that you want to mark this function as done?
            </p>
            <p>This process will not be undone, once marked.</p>
            <div className="mt-5 d-flex justify-content-end">
              <Button onClick={handleCloseFn}>Okay, Proceed</Button>
            </div>
          </Modal>
        </p>
      )}

      <p className="mb-2">
        Due Date: {getFormattedDate(fn?.dueDate as string | Date)}
      </p>
      <h4>Description</h4>
      <p>{fnTemplate?.description}</p>
    </div>
  );

  const handleCloseAllAndFunc = async () => {
    if (!fn) {
      return;
    }
    dispatch(toggleLoading());
    for (let i = 0; i < fn?.fieldInstances.length; i++) {
      try {
        await closeField(fn.fieldInstances[i], user?.id as number);
        console.log("closed field:", fn.fieldInstances[i]);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const response = await doCloseFunction(
        fn,
        fn.id as number,
        user?.id as number
      );
      console.log("close fn:", response);
    } catch (error) {
      console.log(error);
      // alert('Unable to close the fn.');
    }
    dispatch(toggleLoading());
    dispatch(toggleRefetch());
  };

  return (
    <div className="px-3 py-3 h-100 overflow-auto">
      {functionDetails}
      {fnTemplate &&
        fnTemplate.dropdownTemplates &&
        fnTemplate?.dropdownTemplates.length > 0 && (
          <div className="mb-3 d-flex align-items-center gap-3">
            <div className="mb-3">
              <select
                className="form-select"
                value={
                  fnTemplate.dropdownTemplates.find(
                    (ele) => ele.id == fn?.dropdownTemplateId
                  )?.value
                }
                onChange={(e) =>
                  setFn(
                    (prev) =>
                      ({
                        ...prev,
                        dropdownTemplateId: fnTemplate.dropdownTemplates?.find(
                          (ele) => ele.value === e.target.value
                        )?.id,
                      }) as FunctionInstance
                  )
                }
              >
                {fnTemplate?.dropdownTemplates.map((dropdownTemplate) => (
                  <option value={dropdownTemplate.value}>
                    {dropdownTemplate.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <Button variant="warning" onClick={updateFn}>
                Save
              </Button>
            </div>
          </div>
        )}
      <div className="mb-3 d-flex gap-2">
        {!fn?.closedAt && (
          <>
            <Button
              type="button"
              onClick={() => setOpenAddSubFunction(true)}
              disabled={!fnTemplate?.choice}
            >
              Add Sub-Function
            </Button>
            <Button
              type="button"
              variant="info"
              onClick={handleCloseAllAndFunc}
              disabled={!!fn?.closedAt}
            >
              Mark All & Close Function
            </Button>
          </>
        )}

        {openAddSubFunction && (
          <Modal
            open={openAddSubFunction}
            onHide={() => setOpenAddSubFunction(false)}
            heading={"Add Sub-Function"}
            centered
            backdrop
            size="lg"
          >
            {openAddSubFunction && (
              <InputFunctionDetails
                selectedFunctionTemplate={fnTemplate}
                setSelectedFunctionTemplate={setFnTemplate}
                newFunction={fn as FunctionInstance}
                setNewFunction={setFn}
                onAddFunction={handleAddSubFunction}
                onAddAndCloseFunction={handleCloseAllAndFunc}
                handleFunctionDefaultSet={handleFunctionDefaultSet}
                handleModalNavigate={() => {}}
              />
            )}
          </Modal>
        )}
      </div>
      <div className="table overflow-auto">
        <div
          className="thead d-flex border text-bg-light"
          style={{ minWidth: "1116px" }}
        >
          {columns.map((column, index) => {
            const columnWidth = { width: "16%" };
            if (index === 0) {
              columnWidth.width = "4%";
            }
            return (
              <p
                key={column}
                style={columnWidth}
                className={`text-center py-1 border-end ${index !== columns.length - 1 ? "border-end" : ""}`}
              >
                {column}
              </p>
            );
          })}
        </div>
        <div
          id="function-field-row"
          className="tbody border overflow-auto "
          style={{ minWidth: "1116px", maxHeight: "500px" }}
        >
          {fnBkp &&
            fnBkp.fieldInstances.map((field, fieldIndex) => (
              <FieldRow
                key={`fieldIndex-${fieldIndex}`}
                field={field}
                fieldIndex={fieldIndex}
              />
            ))}
        </div>
      </div>
      <div className="my-5 border-top py-4">
        <div className="">
          <div className="mb-3">
            <label htmlFor="remarks" className="mb-2">
              Remarks:
            </label>
            <textarea
              name="remarks"
              id="remarks"
              className="form-control"
              value={fn?.remarks}
              onChange={(e) =>
                setFn(
                  (prev) =>
                    ({ ...prev, remarks: e.target.value }) as FunctionInstance
                )
              }
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="multipartFiles" className="mb-2">
              Remarks:
            </label>
            <input
              type="file"
              name="multipartFiles"
              className="form-control"
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : []; // Convert FileList to File[]
                // setFn(
                //   (prev) =>
                //     ({
                //       ...prev,
                //       multipartFiles: files,
                //     }) as FunctionInstance
                // );
                setFiles(files);
                console.log(fn?.multipartFiles, files);
              }}
            />
          </div>
          <Button variant="danger" type="button" onClick={updateFn}>
            Save
          </Button>
        </div>

        {fn?.filePaths &&
          fn.filePaths.map((filePath) => {
            if (filePath.includes("FIELD-")) {
              return null;
            }
            const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
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
      </div>
      <MyToast
        show={showToast}
        message={showMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
