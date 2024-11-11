import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

import SelectTaskType from "./SelectTaskType";
import SelectTaskPriority from "./SelectTaskPriority";
import InputCustomer from "./InputCustomer";
import InputTaskInfo from "./InputTaskInfo";
import AssignTask from "./AssignTask";
import { createTask, fetchTaskTemplates } from "@/services/task-apis";
import User from "@/lib/user";
import { Customer } from "@/lib/customer";
import { useAuth } from "@/hooks/useAuth";
import Task from "@/lib/task";
import { createCustomer } from "@/services/customer-apis";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "@/app/slices/loadingSlice";
import { toggleRefetch } from "@/app/slices/refetchSlice";
import DepartmentType from "@/lib/department-type";
import SelectDepartment from "./SelectDepartment";
import TaskTemplate from "@/lib/task-template";
import {
  selectTaskTemplates,
  setTaskTemplates,
} from "@/app/slices/taskTemplatesSlice";

type CreateNewTaskProps = {
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMessage: React.Dispatch<React.SetStateAction<string>>;
};
export default function CreateNewTask({
  setShowMessage,
  setShowToast,
}: CreateNewTaskProps) {
  const dispatch = useDispatch();

  const { user } = useAuth();

  const taskTemplates = useSelector(selectTaskTemplates);

  const [newTask, setNewTask] = useState<Task>({
    taskTemplateId: 3,
    priorityType: "NORMAL",
    createdByUserId: user?.id,
    assignedToUserId: user?.id,
    customerId: 1,
    pumpType: "",
    pumpManufacturer: "",
    specifications: "",
    requirements: "",
    problemDescription: "",
  });
  const [assignedUser, setAssignedUser] = useState<User | null>(user);
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentType>("QUOTATION");
  const [customerDetails, setCustomerDetails] = useState<Customer>({
    name: "",
    email: "",
    personOfContact: "",
    phone: "",
    state: "",
    address: "",
    residenceAddress: "",
    city: "",
    pincode: "",
    parentCompanyId: null,
  });
  //   const [taskTemplates, setTaskTemplates] = useState<TaskTemplate[]>([]);
  const [openModal, setOpenModal] = useState({
    taskType: false,
    taskPriority: false,
    customer: false,
    taskInfo: false,
    assignTask: false,
    selectFunction: false,
    inputFunctionDetails: false,
    selectDepartment: false,
  });

  useEffect(() => {
    setNewTask((prev) => ({
      ...prev,
      createdByUserId: user?.id,
      taskTemplateId: taskTemplates.find(
        (ele) => ele.title === "NEW_PUMP_INQUIRY"
      )?.id,
      assignedToUserId: user?.id,
    }));
  }, [user?.id]);

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

  const handleCreateTask = async () => {
    dispatch(toggleLoading());
    setOpenModal((prev) => ({ ...prev, assignTask: false }));
    const tmpTask = { ...newTask };

    console.log("Creating customer...", customerDetails);
    // Create the customer
    const customerResponse = await createCustomer(customerDetails);
    console.log(customerResponse);

    tmpTask.customerId = customerResponse.id as number;
    tmpTask.assignedToUserId = assignedUser?.id as number;

    console.log("tmpTask.assignedToUserId:", tmpTask.assignedToUserId);

    // Create the task
    console.log("Creating task...", tmpTask);
    console.log("assignedUser: ", assignedUser);
    const response = await createTask(tmpTask);
    console.log(response);

    dispatch(toggleLoading());
    dispatch(toggleRefetch());
    setShowToast(true);
    setShowMessage("New Task Created: " + response.abbreviation);
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpenModal((prev) => ({ ...prev, taskType: true }))}
      >
        Create Task
      </Button>
      <Modal
        open={openModal.taskType}
        onHide={() => handleModalHide("taskType")}
        centered
        backdrop
        size="lg"
        heading="Select Task Type"
      >
        {taskTemplates?.length > 0 && (
          <SelectTaskType
            taskTemplates={taskTemplates}
            newTask={newTask}
            setNewTask={setNewTask}
            onNavigateModal={handleModalNavigate}
          />
        )}
      </Modal>
      <Modal
        open={openModal.taskPriority}
        onHide={() => handleModalHide("taskPriority")}
        centered
        backdrop
        size="lg"
        heading="Task Priority"
      >
        <SelectTaskPriority
          setNewTask={setNewTask}
          onNavigateModal={handleModalNavigate}
        />
      </Modal>
      <Modal
        open={openModal.customer}
        onHide={() => handleModalHide("customer")}
        centered
        backdrop
        size="xl"
        heading="Customer Details"
      >
        <InputCustomer
          onNavigateModal={handleModalNavigate}
          customerDetails={customerDetails}
          setCustomerDetails={setCustomerDetails}
        />
      </Modal>
      <Modal
        open={openModal.taskInfo}
        onHide={() => handleModalHide("taskInfo")}
        centered
        backdrop
        size="lg"
        heading={
          <p className="d-flex gap-2">
            <span>Task Info:</span>
            <span className="fs-6 d-inline-flex align-items-center rounded px-1 bg-body-secondary">
              {taskTemplates &&
                taskTemplates.find((ele) => ele.id === newTask.taskTemplateId)
                  ?.title}
            </span>
          </p>
        }
      >
        <InputTaskInfo
          newTask={newTask}
          taskTemplates={taskTemplates}
          setNewTask={setNewTask}
          onNavigateModal={handleModalNavigate}
        />
      </Modal>
      <Modal
        open={openModal.selectDepartment}
        onHide={() => handleModalHide("selectDepartment")}
        centered
        backdrop
        size="lg"
        heading="Select Department"
      >
        <SelectDepartment
          taskTemplate={taskTemplates.find(
            (ele) => ele.id === newTask.taskTemplateId
          )}
          onNavigateBackModal={() => handleModalNavigate("taskInfo")}
          onNavigateContinueModal={() => handleModalNavigate("assignTask")}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
        />
      </Modal>
      <Modal
        open={openModal.assignTask}
        onHide={() => handleModalHide("assignTask")}
        centered
        backdrop
        size="lg"
        heading="Assign Task"
      >
        {assignedUser != null && (
          <AssignTask
            selectedDepartment={selectedDepartment}
            onNavigateModal={handleModalNavigate}
            task={newTask}
            setTask={setNewTask}
            assignedUser={assignedUser}
            setAssignedUser={setAssignedUser}
            onContinue={handleCreateTask}
          />
        )}
      </Modal>
    </>
  );
}
