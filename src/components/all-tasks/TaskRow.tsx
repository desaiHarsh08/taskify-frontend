// import Task, { FunctionInstance } from "@/lib/task";
// import { getFormattedDate } from "@/utils/helpers";
// import { Link } from "react-router-dom";

// import styles from "@/styles/TaskRow.module.css";
// import { useEffect, useState } from "react";
// import { fetchTaskTemplateById } from "@/services/task-template-apis";

// import { fetchFunctionTemplateById } from "@/services/function-template-apis";
// import TaskTemplate from "@/lib/task-template";
// import { fetchFunctionsByTaskInstanceId } from "@/services/function-apis";

// type TaskRowProps = {
//   task: Task;
//   taskIndex: number;
//   selectedTasks: Task[];
//   onSelectTask: (task: Task) => void;
//   pageData: {
//     pageNumber: number;
//     pageSize: number;
//     totalPages: number;
//     totalRecords: number;
//   };
// };
// export default function TaskRow({
//   task,
//   taskIndex,
//   onSelectTask,
//   selectedTasks,
//   pageData,
// }: TaskRowProps) {
//   const [taskTemplate, setTaskTemplate] = useState<TaskTemplate | null>(null);

//   const [department, setDepartment] = useState("");

//   const [lastEdited, setLastEdited] = useState<Date | null>(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await fetchTaskTemplateById(
//           task.taskTemplateId as number
//         );
//         setTaskTemplate(response);
//       } catch (error) {
//         console.log("Unable to fetch the data");
//       }
//     })();

//     // console.log("task:", task)
//     const fnUnderProcess = task.functionInstances?.find(
//       (fn) => fn.closedAt !== null
//     );
//     // console.log(fnUnderProcess);
//     if (fnUnderProcess) {
//       getDepartment(fnUnderProcess as FunctionInstance);
//     }
//   }, [task.taskTemplateId]);

//   useEffect(() => {
//     (async () => {
//       if (task && task.functionInstances) {
//         try {
//           const response = await fetchFunctionsByTaskInstanceId(
//             task.id as number
//           );
//           for (let i = 0; i < response?.length; i++) {
//             console.log("in loop");
//             console.log("last edited date:", response[i].closedAt);
//             if (response[i].closedAt != null) {
//               setLastEdited(response[i].closedAt as Date);
//               break;
//             }
//             // for (
//             //   let j = 0;
//             //   j < task.functionInstances[i].fieldInstances.length;
//             //   j++
//             // ) {
//             //   const fieldDate = new Date(
//             //     task.functionInstances[i].fieldInstances[j].updatedAt as Date
//             //   );
//             //   console.log("fielddate:", fieldDate);
//             //   if (fieldDate <= tmpDate) {
//             //     tmpDate = fieldDate;
//             //   }
//             // }
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     })();

//     // if (task && task.functionInstances) {
//     //   console.log("in if, task.functionInstances:", task.functionInstances);
//     //   for (let i = 0; i < task?.functionInstances?.length; i++) {
//     //     console.log("in loop");
//     //     console.log("last edited date:", task?.functionInstances[i].closedAt);
//     //     if (task?.functionInstances[i].closedAt != null) {
//     //       setLastEdited(task?.functionInstances[i].closedAt as Date);
//     //       break;
//     //     }
//     //     // for (
//     //     //   let j = 0;
//     //     //   j < task.functionInstances[i].fieldInstances.length;
//     //     //   j++
//     //     // ) {
//     //     //   const fieldDate = new Date(
//     //     //     task.functionInstances[i].fieldInstances[j].updatedAt as Date
//     //     //   );
//     //     //   console.log("fielddate:", fieldDate);
//     //     //   if (fieldDate <= tmpDate) {
//     //     //     tmpDate = fieldDate;
//     //     //   }
//     //     // }
//     //   }
//     // }
//   }, [task]);

//   const getDepartment = async (fn: FunctionInstance) => {
//     try {
//       const response = await fetchFunctionTemplateById(
//         fn.functionTemplateId as number
//       );
//       setDepartment(response.department);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Link
//       to={`/home/tasks/${task.id}`}
//       className={`${styles["task-row-card"]} d-flex border-bottom text-decoration-none`}
//       style={{ paddingRight: "14px" }}
//     >
//       <p className="border-end text-center" style={{ width: "9%" }}>
//         {(pageData.pageNumber - 1) * pageData.pageSize + taskIndex + 1}.
//       </p>
//       <p className="border-end text-center" style={{ width: "13%" }}>
//         #{task.abbreviation}
//       </p>
//       <p className="border-end text-center" style={{ width: "13%" }}>
//         {taskTemplate?.title}
//       </p>
//       <p className="border-end text-center" style={{ width: "13%" }}>
//         {"todo"}
//       </p>
//       <p className="border-end text-center" style={{ width: "13%" }}>
//         {"todo"}
//       </p>
//       <p className="border-end text-center" style={{ width: "13%" }}>
//         {department}
//       </p>
//       <p className="border-end text-center" style={{ width: "13%" }}>
//         {task.priorityType === "HIGH" && (
//           <span className="badge bg-danger">{task.priorityType}</span>
//         )}
//         {task.priorityType === "MEDIUM" && (
//           <span className="badge bg-secondary">{task.priorityType}</span>
//         )}
//         {task.priorityType === "NORMAL" && (
//           <span className="badge bg-light text-dark border">
//             {task.priorityType}
//           </span>
//         )}
//       </p>

//       <p className="border-end text-center" style={{ width: "13%" }}>
//         {getFormattedDate(lastEdited as Date)}
//       </p>
//       <p className="border-end text-center" style={{ width: "13%" }}>
//         {task.closedAt ? getFormattedDate(task.closedAt as Date) : "-"}
//       </p>
//     </Link>
//   );
// }

import Task, { FunctionInstance } from "@/lib/task";
import { getFormattedDate } from "@/utils/helpers";
import { Link } from "react-router-dom";

import styles from "@/styles/TaskRow.module.css";
import { useEffect, useState } from "react";
import { fetchTaskTemplateById } from "@/services/task-template-apis";

import { fetchFunctionTemplateById } from "@/services/function-template-apis";
import TaskTemplate from "@/lib/task-template";
import { fetchFunctionsByTaskInstanceId } from "@/services/function-apis";
import { useSelector } from "react-redux";
import { selectTaskTemplates } from "@/app/slices/taskTemplatesSlice";

type TaskRowProps = {
  task: Task;
  taskIndex: number;
  selectedTasks: Task[];
  onSelectTask: (task: Task) => void;
  pageData: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
  };
};
export default function TaskRow({
  task,
  taskIndex,
  onSelectTask,
  selectedTasks,
  pageData,
}: TaskRowProps) {
  const taskTemplates = useSelector(selectTaskTemplates);

  const [taskTemplate, setTaskTemplate] = useState<TaskTemplate | null>(null);

  const [department, setDepartment] = useState("");

  const [lastEdited, setLastEdited] = useState<Date | null>(null);

  useEffect(() => {
    // (async () => {
    //   try {
    //     const response = await fetchTaskTemplateById(
    //       task.taskTemplateId as number
    //     );
    //     setTaskTemplate(response);
    //   } catch (error) {
    //     console.log("Unable to fetch the data");
    //   }
    // })();
    const newTaskTemplate = taskTemplates.find(
      (t) => t.id == task.taskTemplateId
    );
    setTaskTemplate(newTaskTemplate as TaskTemplate);

    // console.log("task:", task)
    const fnUnderProcess = task.functionInstances?.find(
      (fn) => fn.closedAt !== null
    );
    // console.log(fnUnderProcess);
    if (fnUnderProcess) {
      getDepartment(fnUnderProcess as FunctionInstance);
    }
  }, [task.taskTemplateId]);

  useEffect(() => {
    (async () => {
      if (task && task.functionInstances) {
        try {
          const response = await fetchFunctionsByTaskInstanceId(
            task.id as number
          );
          for (let i = 0; i < response?.length; i++) {
            console.log("in loop");
            console.log("last edited date:", response[i].closedAt);
            if (response[i].closedAt != null) {
              setLastEdited(response[i].closedAt as Date);
              break;
            }
            // for (
            //   let j = 0;
            //   j < task.functionInstances[i].fieldInstances.length;
            //   j++
            // ) {
            //   const fieldDate = new Date(
            //     task.functionInstances[i].fieldInstances[j].updatedAt as Date
            //   );
            //   console.log("fielddate:", fieldDate);
            //   if (fieldDate <= tmpDate) {
            //     tmpDate = fieldDate;
            //   }
            // }
          }
        } catch (error) {
          console.log(error);
        }
      }
    })();

    // if (task && task.functionInstances) {
    //   console.log("in if, task.functionInstances:", task.functionInstances);
    //   for (let i = 0; i < task?.functionInstances?.length; i++) {
    //     console.log("in loop");
    //     console.log("last edited date:", task?.functionInstances[i].closedAt);
    //     if (task?.functionInstances[i].closedAt != null) {
    //       setLastEdited(task?.functionInstances[i].closedAt as Date);
    //       break;
    //     }
    //     // for (
    //     //   let j = 0;
    //     //   j < task.functionInstances[i].fieldInstances.length;
    //     //   j++
    //     // ) {
    //     //   const fieldDate = new Date(
    //     //     task.functionInstances[i].fieldInstances[j].updatedAt as Date
    //     //   );
    //     //   console.log("fielddate:", fieldDate);
    //     //   if (fieldDate <= tmpDate) {
    //     //     tmpDate = fieldDate;
    //     //   }
    //     // }
    //   }
    // }
  }, [task]);

  const getDepartment = async (fn: FunctionInstance) => {
    try {
      const response = await fetchFunctionTemplateById(
        fn.functionTemplateId as number
      );
      setDepartment(response.department);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link
      to={`/home/tasks/${task.abbreviation}`}
      className={`${styles["task-row-card"]} d-flex border-bottom text-decoration-none`}
      style={{ paddingRight: "14px" }}
    >
      <p
        className="form-check border-end d-flex justify-content-center align-items-center"
        style={{ width: "3%" }}
      >
        <input
          className="form-check-input m-0 "
          type="checkbox"
          checked={selectedTasks.some((t) => t.id === task.id)}
          onChange={() => onSelectTask(task)}
        />
      </p>
      <p className="border-end text-center" style={{ width: "7%" }}>
        {(pageData.pageNumber - 1) * pageData.pageSize + taskIndex + 1}.
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        #{task.abbreviation}
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        {taskTemplate?.title}
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        {task.priorityType === "HIGH" && (
          <span className="badge bg-danger">{task.priorityType}</span>
        )}
        {task.priorityType === "MEDIUM" && (
          <span className="badge bg-secondary">{task.priorityType}</span>
        )}
        {task.priorityType === "NORMAL" && (
          <span className="badge bg-light text-dark border">
            {task.priorityType}
          </span>
        )}
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        {department}
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        {getFormattedDate(lastEdited as Date)}
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        {!task.closedAt ? (
          <span className="badge bg-warning">IN_PROGRESS</span>
        ) : (
          <span className="badge bg-success">CLOSED</span>
        )}
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        {task.closedAt ? getFormattedDate(task.closedAt as Date) : "-"}
      </p>
      <p className="border-end text-center" style={{ width: "11.25%" }}>
        <Link
          to={`/home/tasks/${task.id}`}
          className="btn btn-primary py-1"
          style={{ fontSize: "14px" }}
        >
          View
        </Link>
      </p>
    </Link>
  );
}
