/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import SelectFunction from "./SelectFunction";
import TaskTemplate, {
  FieldTemplate,
  FunctionTemplate,
} from "@/lib/task-template";
import AssignTask from "../taskboard/AssignTask";
import User from "@/lib/user";
import Task, {
  ColumnInstance,
  FieldInstance,
  FunctionInstance,
} from "@/lib/task";
import InputFunctionDetails from "./InputFunctionDetails";
import { useAuth } from "@/hooks/useAuth";
import { fetchTaskById } from "@/services/task-apis";
import {
  createFunction,
  doCloseFunction,
  fetchFunctionsByTaskInstanceId,
} from "@/services/function-apis";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "@/app/slices/loadingSlice";

import { uploadFiles } from "@/services/column-apis";
import { uploadFiles as uploadFnFiles } from "@/services/function-apis";
import { selectRefetch, toggleRefetch } from "@/app/slices/refetchSlice";
import DepartmentType from "@/lib/department-type";
import SelectDepartment from "../taskboard/SelectDepartment";
import { closeField } from "@/services/field-apis";
import { selectTaskTemplates } from "@/app/slices/taskTemplatesSlice";
import { AxiosError } from "axios";

type AddFunctionProps = {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  getTask: () => Promise<void>;
};

export default function AddFunction({ task, setTask }: AddFunctionProps) {
  const { user } = useAuth();

  const refetchFlag = useSelector(selectRefetch);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const taskTemplates = useSelector(selectTaskTemplates);
  const [tmpFilesObj, setTmpFilesObj] = useState<
    {
      fieldIndex: number;
      columnIndex: number;
      files: File[];
    }[]
  >([]);

  const [selectDepartment, setselectDepartment] =
    useState<DepartmentType>("QUOTATION");
  const [taskTemplate, setTaskTemplate] = useState<TaskTemplate | null>();
  const [assignedUser, setAssignedUser] = useState<User | null>(user);
  const [newFunction, setNewFunction] = useState<FunctionInstance | null>(null);
  const [selectedFunctionTemplate, setSelectedFunctionTemplate] =
    useState<FunctionTemplate | null>(null);
  const [openModal, setOpenModal] = useState({
    selectFunction: false,
    assignTask: false,
    inputFunctionDetails: false,
    taskType: false,
    taskPriority: false,
    customer: false,
    taskInfo: false,
    selectDepartment: false,
  });

  useEffect(() => {
    console.log("Updated state in parent:", newFunction);
  }, [newFunction, refetchFlag]);

  useEffect(() => {
    // (async () => {
    //   const response = await fetchTaskTemplateById(Number(task.taskTemplateId));

    //   console.log("response for task-prototype:", response);

    const tmpTaskTemplate = taskTemplates.find(
      (t) => t.id == task.taskTemplateId
    );
    if (tmpTaskTemplate) {
      // Set the task_prototype
      setTaskTemplate(tmpTaskTemplate);

      handleFunctionDefaultSet(tmpTaskTemplate.functionTemplates[0]);

      setSelectedFunctionTemplate(tmpTaskTemplate.functionTemplates[0]);
    }
    // })();
  }, [task.id, user?.id, taskTemplates]);

  const getSortedColumnTemplates = (fieldTemplate: FieldTemplate) => {
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

      console.log("sortedColumnTemplates:", sortedColumnTemplates);
      return sortedColumnTemplates;
    }

    return fieldTemplate.columnTemplates;
  };

  const handleFunctionDefaultSet = (fnTemplate: FunctionTemplate) => {
    console.log("Fired, handleFunctionDefaultSet()");
    const tmpNewFn: FunctionInstance = {
      ...newFunction,
      functionTemplateId: fnTemplate.id,
      taskInstanceId: task.id,
      createdByUserId: user?.id,
      dueDate: new Date(),
      fieldInstances: [],
      remarks: "",
      filePaths: [],
      multipartFiles: [],
      dropdownTemplateId:
        fnTemplate.dropdownTemplates && fnTemplate.dropdownTemplates.length > 0
          ? (fnTemplate.dropdownTemplates[0].id as number)
          : null,
    };

    // Set the fields
    const tmpFields: FieldInstance[] = [];
    for (let i = 0; i < fnTemplate.fieldTemplates.length; i++) {
      const fieldTemplate = fnTemplate.fieldTemplates[i];
      const field: FieldInstance = {
        fieldTemplateId: fieldTemplate.id as number,
        createdByUserId: user?.id,
        columnInstances: [],
      };
      const sortedColumnTemplates = getSortedColumnTemplates(fieldTemplate);

      for (let j = 0; j < sortedColumnTemplates.length; j++) {
        const columnTemplate = sortedColumnTemplates[j];
        if (!columnTemplate) {
          continue;
        }
        const newColInstance: ColumnInstance = {
          columnTemplateId: columnTemplate.id,
          numberValue: 0,
          textValue: "",
          dateValue: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`,
          booleanValue: false,
          columnVariantInstances: [],
          rowTableInstances: [],
          dropdownTemplateId:
            columnTemplate.dropdownTemplates &&
            columnTemplate.dropdownTemplates?.length > 0
              ? (columnTemplate.dropdownTemplates[0].id as number)
              : null,
        };

        if (
          columnTemplate.columnVariantTemplates &&
          columnTemplate.columnVariantTemplates?.length > 0
        ) {
          newColInstance.columnVariantInstances.push({
            booleanValue: false,
            columnVariantTemplateId: columnTemplate.columnVariantTemplates[0]
              .id as number,
            dateValue: new Date(),
            numberValue: 0,
            textValue: "",
          });
        }
        field.columnInstances.push(newColInstance);
      }
      tmpFields.push(field);
    }
    tmpNewFn.fieldInstances = [...tmpFields];

    setNewFunction(tmpNewFn);
  };

  const handleModalNavigate = (modalKey: keyof typeof openModal) => {
    setOpenModal((prev) => {
      const newOpenModal = { ...prev };
      for (const key in newOpenModal) {
        newOpenModal[key as keyof typeof newOpenModal] = key === modalKey;
      }
      return newOpenModal;
    });
  };

  const handleModalHide = (modalType: keyof typeof openModal) => {
    setOpenModal((prev) => ({
      ...prev,
      [modalType]: false,
    }));
  };

  const handleAddFunction = async () => {
    console.log("in add-fn, newFunction:", newFunction);
    if (!newFunction) {
      return;
    }
    setLoading(true);
    let tmpNewFn = _.cloneDeep(newFunction);
    const tmpDueDate = new Date(tmpNewFn.dueDate);
    const formattedDueDate = `${tmpDueDate.getFullYear()}-${(tmpDueDate.getMonth() + 1).toString().padStart(2, "0")}-${tmpDueDate.getDate().toString().padStart(2, "0")}`;
    tmpNewFn.dueDate = `${formattedDueDate}T00:00:00`;
    for (let i = 0; i < tmpNewFn.fieldInstances.length; i++) {
      for (
        let j = 0;
        j < tmpNewFn.fieldInstances[i].columnInstances.length;
        j++
      ) {
        let tmpDate = null;
        let formattedDate = null;
        if (tmpNewFn.fieldInstances[i].columnInstances[j].dateValue) {
          tmpDate = new Date(
            tmpNewFn.fieldInstances[i].columnInstances[j].dateValue as string
          );
          formattedDate = `${tmpDate.getFullYear()}-${(tmpDate.getMonth() + 1).toString().padStart(2, "0")}-${tmpDate.getDate().toString().padStart(2, "0")}`;
          formattedDate = `${formattedDate}T00:00:00`;
        }
        tmpNewFn.fieldInstances[i].columnInstances[j] = {
          ...tmpNewFn.fieldInstances[i].columnInstances[j],
          dateValue:
            tmpNewFn.fieldInstances[i].columnInstances[j].dateValue == null
              ? null
              : formattedDate,
        };
      }
    }

    dispatch(toggleLoading());
    try {
      const { multipartFiles, ...tfn } = tmpNewFn;
      console.log("Creating tfn:", tfn);
      const response = await createFunction(
        tfn as FunctionInstance,
        assignedUser?.id as number
      );
      console.log(response);
      //   Upload the files
      for (let i = 0; i < tmpNewFn?.fieldInstances?.length; i++) {
        for (
          let j = 0;
          j < tmpNewFn.fieldInstances[i].columnInstances.length;
          j++
        ) {
          const col = tmpNewFn.fieldInstances[i].columnInstances[j];
          console.log("col:", col);
          if (col.multipartFiles) {
            console.log("in if block, 217");
            const fieldInstances = response.fieldInstances.filter(
              (ele) =>
                ele.fieldTemplateId ==
                tmpNewFn.fieldInstances[i].fieldTemplateId
            );
            for (let k = 0; k < fieldInstances.length; k++) {
              console.log("in if fieldInstance loop, 224");
              const clm = fieldInstances[k].columnInstances.find(
                (ele) => ele.columnTemplateId == col.columnTemplateId
              );
              console.log("clm:", clm);
              if (clm) {
                console.log("uploading column, files: -", col.multipartFiles);
                // if (col.multipartFiles.length == 0) {
                //   alert("no files");
                //   return;
                // }
                try {
                  const resCol = await uploadFiles(clm, col.multipartFiles);
                  console.log(
                    "uploaded file for column:",
                    clm,
                    ", resCol:",
                    resCol
                  );
                } catch (error) {
                  console.log(error);
                  alert(`unable to upload the files for: ${col}`);
                }
              }
            }
          }
        }
      }

      try {
        const resFile = await uploadFnFiles(
          response,
          tmpNewFn.multipartFiles as File[]
        );
        console.log(resFile);
      } catch (error) {
        error as AxiosError;
        alert("Unable to upload the function files...!");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      alert("Error in creating fn,");
    } finally {
      dispatch(toggleLoading());
      dispatch(toggleRefetch());
      setOpenModal({
        selectFunction: false,
        assignTask: false,
        inputFunctionDetails: false,
        taskType: false,
        taskPriority: false,
        customer: false,
        taskInfo: false,
        selectDepartment: false,
      });
    }

    try {
      const response = await fetchTaskById(Number(task.id));
      setTask(response);
    } catch (error) {
      console.log(error);
    }

    try {
      const resFn = await fetchFunctionsByTaskInstanceId(task.id as number);
      setTask((prev) => ({ ...prev, functionInstances: resFn }));
    } catch (error) {}

    setLoading(false);
  };

  const handleAddAndCloseFunction = async () => {
    if (!newFunction) {
      return;
    }
    // Destructure all keys except 'multipartFiles'
    const { multipartFiles, ...tmpNewFn }: FunctionInstance = {
      ...newFunction,
    };

    console.log("tmpNewFn:", tmpNewFn);
    const tmpDueDate = new Date(tmpNewFn.dueDate);
    const formattedDueDate = `${tmpDueDate.getFullYear()}-${(tmpDueDate.getMonth() + 1).toString().padStart(2, "0")}-${tmpDueDate.getDate().toString().padStart(2, "0")}`;
    tmpNewFn.dueDate = formattedDueDate + "T00:00:00";
    for (let i = 0; i < tmpNewFn.fieldInstances.length; i++) {
        for (
          let j = 0;
          j < tmpNewFn.fieldInstances[i].columnInstances.length;
          j++
        ) {
          let tmpDate = null;
          let formattedDate = null;
          if (tmpNewFn.fieldInstances[i].columnInstances[j].dateValue) {
            tmpDate = new Date(
              tmpNewFn.fieldInstances[i].columnInstances[j].dateValue as string
            );
            formattedDate = `${tmpDate.getFullYear()}-${(tmpDate.getMonth() + 1).toString().padStart(2, "0")}-${tmpDate.getDate().toString().padStart(2, "0")}`;
            formattedDate = `${formattedDate}T00:00:00`;
          }
          tmpNewFn.fieldInstances[i].columnInstances[j] = {
            ...tmpNewFn.fieldInstances[i].columnInstances[j],
            dateValue:
              tmpNewFn.fieldInstances[i].columnInstances[j].dateValue == null
                ? null
                : formattedDate,
  
            multipartFiles:
              tmpNewFn.fieldInstances[i].columnInstances[j].multipartFiles,
          };
        }
      }

    dispatch(toggleLoading());
    try {
      const response = await createFunction(
        tmpNewFn as FunctionInstance,
        assignedUser?.id as number
      );
      console.log(response);
      //   Upload the files
      for (let i = 0; i < tmpNewFn?.fieldInstances?.length; i++) {
        for (
          let j = 0;
          j < tmpNewFn.fieldInstances[i].columnInstances.length;
          j++
        ) {
        //   const col = tmpNewFn.fieldInstances[i].columnInstances[j];
        //   if (col.multipartFiles && col.multipartFiles?.length > 0) {
        //     const fields = response.fieldInstances.filter(
        //       (ele) =>
        //         ele.fieldTemplateId ===
        //         tmpNewFn.fieldInstances[i].fieldTemplateId
        //     );
        //     for (let k = 0; k < fields.length; k++) {
        //       const clm = fields[k].columnInstances.find(
        //         (ele) => ele.columnTemplateId === col.columnTemplateId
        //       );
        //       if (clm) {
        //         try {
        //           const resCol = await uploadFiles(clm, col.multipartFiles);
        //           console.log(resCol);
        //         } catch (error) {
        //           console.log(error);
        //         }
        //       }
        //     }
        //   }

        const col = tmpNewFn.fieldInstances[i].columnInstances[j];
          console.log("col:", col);
          const files = tmpFilesObj.find(
            (ele) => ele.fieldIndex == i && ele.columnIndex == j
          )?.files;
          if (files) {
            console.log("in if block, 217");
            const fieldInstances = response.fieldInstances.filter(
              (ele) =>
                ele.fieldTemplateId == tmpNewFn.fieldInstances[i].fieldTemplateId
            );
            for (let k = 0; k < fieldInstances.length; k++) {
              console.log("in if fieldInstance loop, 224");
              const clm = fieldInstances[k].columnInstances.find(
                (ele) => ele.columnTemplateId == col.columnTemplateId
              );
              console.log("clm:", clm);
              if (clm) {
                console.log("uploading column, files: -", files);
                // if (col.multipartFiles.length == 0) {
                //   alert("no files");
                //   return;
                // }
                try {
                  const resCol = await uploadFiles(clm, files);
                  console.log(
                    "uploaded file for column:",
                    clm,
                    ", resCol:",
                    resCol
                  );
                } catch (error) {
                  console.log(error);
                  alert(`unable to upload the files for: ${col}`);
                }
              }
            }
          }

        }
      }

      if (multipartFiles) {
        try {
          const resFile = await uploadFnFiles(
            response,
            multipartFiles as File[]
          );
          console.log(resFile);
        } catch (error) {
          // alert('Unable to upload the function files...!');
          console.log(error);
        }
      }

      for (let i = 0; i < response.fieldInstances.length; i++) {
        try {
          const resField = await closeField(
            response.fieldInstances[i],
            user?.id as number
          );
          console.log("resField close:", resField);
        } catch (error) {
          console.log(
            "unable to close response.fields[i]:",
            response.fieldInstances[i]
          );
        }
      }

      try {
        const resClose = await doCloseFunction(
          response,
          response.id as number,
          user?.id as number
        );
        console.log("resClose:", resClose);
      } catch (error) {
        console.log("unable to close fn:", error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
      dispatch(toggleRefetch());
      setOpenModal({
        selectFunction: false,
        assignTask: false,
        inputFunctionDetails: false,
        taskType: false,
        taskPriority: false,
        customer: false,
        taskInfo: false,
        selectDepartment: false,
      });
    }

    try {
      console.log("before task.fn.length: ", task.functionInstances?.length);
      const response = await fetchTaskById(Number(task.id));
      console.log(
        "after adding fn task: ",
        response,
        response.functionInstances?.length
      );
      setTask(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    newFunction && (
      <div>
        {
          <Button
            type="button"
            onClick={() => handleModalNavigate("selectDepartment")}
            // disabled={
            //   !!task.closedAt ||
            //   task.functionInstances?.some((fn) => !fn.closedAt)
            // }
          >
            Add
          </Button>
        }
        <Modal
          open={openModal.selectDepartment}
          onHide={() => handleModalHide("selectDepartment")}
          centered
          backdrop
          size="lg"
          heading="Select Department"
        >
          {taskTemplate && (
            <SelectDepartment
              handleFunctionDefaultSet={handleFunctionDefaultSet}
              backBtn={false}
              onNavigateContinueModal={() =>
                handleModalNavigate("selectFunction")
              }
              selectedDepartment={selectDepartment}
              setSelectedDepartment={setselectDepartment}
              taskTemplate={taskTemplate}
              setSelectedFunctionTemplate={setSelectedFunctionTemplate}
            />
          )}
        </Modal>
        <Modal
          open={openModal.selectFunction}
          onHide={() => handleModalHide("selectFunction")}
          centered
          backdrop
          heading="Add Function"
          size="lg"
        >
          {taskTemplate && selectedFunctionTemplate && (
            <SelectFunction
              selectedDepartment={selectDepartment}
              taskTemplate={taskTemplate}
              selectedFunctionTemplate={selectedFunctionTemplate}
              setSelectedFunctionTemplate={setSelectedFunctionTemplate}
              handleModalNavigate={handleModalNavigate}
              onFunctionDefaultSet={handleFunctionDefaultSet}
            />
          )}
        </Modal>
        <Modal
          open={openModal.assignTask}
          onHide={() => handleModalHide("assignTask")}
          centered
          backdrop
          heading="Assign Task"
          size="lg"
        >
          <AssignTask
            selectedDepartment={selectDepartment}
            task={task}
            setTask={setTask}
            assignedUser={assignedUser}
            onNavigateModal={handleModalNavigate}
            setAssignedUser={setAssignedUser}
            onContinue={async () => {
              if (assignedUser?.id != user?.id) {
                setTask((prev) => ({
                  ...prev,
                  assignedToUserId: assignedUser?.id,
                }));
                // try {
                //   console.log("Assigning the task by creating new fn");
                //   //   const response = await updateTask(task, user?.id as number);
                // //   handleAddFunction();
                //   //   console.log(response);
                // } catch (error) {
                //   console.log(error);
                // }

                dispatch(toggleLoading());
                try {
                  const newFnResponse = await createFunction(
                    newFunction,
                    assignedUser?.id as number
                  );
                  console.log(newFnResponse);
                } catch (error) {
                  console.log(error);
                } finally {
                  dispatch(toggleLoading());
                  dispatch(toggleRefetch());
                  setOpenModal((prev) => ({ ...prev, assignTask: false }));
                }
              } else {
                handleModalNavigate("inputFunctionDetails");
              }
            }}
          />
        </Modal>
        <Modal
          open={openModal.inputFunctionDetails}
          onHide={() => handleModalHide("inputFunctionDetails")}
          centered
          backdrop
          heading={
            <p className="d-flex gap-2 align-items-center">
              {/* <span>Function:</span> */}
              <span className="badge bg-body-secondary text-dark rounded">
                {selectedFunctionTemplate?.title}
              </span>
            </p>
          }
          size="xl"
        >
          <InputFunctionDetails
            selectedFunctionTemplate={selectedFunctionTemplate}
            newFunction={newFunction as FunctionInstance}
            setNewFunction={
              setNewFunction as React.Dispatch<
                React.SetStateAction<FunctionInstance | null>
              >
            }
            tmpFilesObj={tmpFilesObj}
            setTmpFilesObj={setTmpFilesObj}
            handleFunctionDefaultSet={handleFunctionDefaultSet}
            setSelectedFunctionTemplate={setSelectedFunctionTemplate}
            handleModalNavigate={handleModalNavigate}
            onAddFunction={handleAddFunction}
            onAddAndCloseFunction={handleAddAndCloseFunction}
            loading={loading}
            setLoading={setLoading}
            setOpenModal={setOpenModal}
            assignedUser={assignedUser}
            setTask={setTask}
            task={task}
          />
        </Modal>
      </div>
    )
  );
}
