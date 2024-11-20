import { FaEye } from "react-icons/fa";

import Button from "../ui/Button";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Modal from "../ui/Modal";
import { useState } from "react";
import {  FieldInstance, FunctionInstance } from "@/lib/task";
import {
//   ColumnTemplate,
//   ColumnVariantTemplate,
  FieldTemplate,
//   NextFollowUpColumnTemplate,
} from "@/lib/task-template";
import DoneField from "./DoneField";
import { closeField, deleteField } from "@/services/field-apis";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { toggleLoading } from "@/app/slices/loadingSlice";
import { toggleRefetch } from "@/app/slices/refetchSlice";
import DeleteField from "./DeleteField";
import EditColumn from "./EditColumn";
// import { selectTaskTemplates } from "@/app/slices/taskTemplatesSlice";

type FieldActionsProps = {
  fn: FunctionInstance;
  setFn: React.Dispatch<React.SetStateAction<FunctionInstance | null>>;
  field: FieldInstance;
  fieldTemplate: FieldTemplate;
};

export default function FieldActions({
  field,
  fieldTemplate,
  fn,
  setFn,
}: FieldActionsProps) {
//   const taskTemplates = useSelector(selectTaskTemplates);

  const { user } = useAuth();

  const dispatch = useDispatch();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDoneModal, setOpenDoneModal] = useState(false);

  const handleDoneField = async () => {
    dispatch(toggleLoading());
    try {
      const response = await closeField(field, user?.id as number);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
      dispatch(toggleRefetch());
      setOpenDoneModal(false);
    }
  };

  const handleDeleteField = async () => {
    dispatch(toggleLoading());
    try {
      const response = await deleteField(field.id as number);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
      dispatch(toggleRefetch());
      setOpenDeleteModal(false);
    }
  };

//   const handleCheckBox = (
//     fieldTemplate: FieldTemplate,
//     columnTemplate: ColumnTemplate,
//     value: boolean,
//     givenColumnVariantTemplate: ColumnVariantTemplate
//   ) => {
//     console.log("in checkbox, value:", value);
//     let tmpFn = { ...fn };
//     for (let i = 0; i < tmpFn.fieldInstances.length; i++) {
//       if (tmpFn.fieldInstances[i].fieldTemplateId === fieldTemplate.id) {
//         if (value) {
//           // Check
//           console.log("in check for add");

//           tmpFn.fieldInstances[i] = handleChecked(
//             true,
//             tmpFn.fieldInstances[i],
//             columnTemplate,
//             givenColumnVariantTemplate
//           );

//           // Add follow-ups new-cols
//           const newxtFollowUps = handleGetNextFollowUpColumns(
//             givenColumnVariantTemplate,
//             tmpFn.fieldInstances[i].id as number
//           );
//           tmpFn.fieldInstances[i].columnInstances.push(...newxtFollowUps);
//         } else {
//           console.log("in check for remove");
//           // Uncheck
//           tmpFn.fieldInstances[i] = handleChecked(
//             false,
//             tmpFn.fieldInstances[i],
//             columnTemplate,
//             givenColumnVariantTemplate
//           );
//           //   for (
//           //     let j = 0;
//           //     j < tmpFn.fieldInstances[i].columnInstances.length;
//           //     j++
//           //   ) {
//           //     tmpFn.fieldInstances[i].columnInstances = tmpFn.fieldInstances[
//           //       i
//           //     ].columnInstances.map((colInstance) => {
//           //       if (colInstance.columnTemplateId === columnTemplate.id) {
//           //         const newColInstance = { ...colInstance };
//           //         newColInstance.columnVariantInstances =
//           //           newColInstance.columnVariantInstances?.map(
//           //             (colVariantInstance) => {
//           //               if (
//           //                 colVariantInstance.columnVariantTemplateId ===
//           //                 givenColumnVariantTemplate.id
//           //               ) {
//           //                 return {
//           //                   ...colVariantInstance,
//           //                   columnVariantTemplateId: null,
//           //                 };
//           //               }

//           //               return colVariantInstance;
//           //             }
//           //           );
//           //       }
//           //       return colInstance;
//           //     });
//           //   }

//           // Remove follow-ups cols
//           const { nextFollowUpColumnTemplates } = givenColumnVariantTemplate;
//           if (nextFollowUpColumnTemplates) {
//             tmpFn.fieldInstances[i].columnInstances =
//               handleRemoveNextFollowUpColumns(
//                 tmpFn.fieldInstances[i].columnInstances,
//                 nextFollowUpColumnTemplates
//               );
//           }
//         }
//       }
//     }

//     setFn(tmpFn);
//   };

//   const handleChecked = (
//     value: boolean,
//     fieldInstance: FieldInstance,
//     columnTemplate: ColumnTemplate,
//     givenColumnVariantTemplate: ColumnVariantTemplate
//   ) => {
//     for (let j = 0; j < fieldInstance.columnInstances.length; j++) {
//       fieldInstance.columnInstances = fieldInstance.columnInstances.map(
//         (colInstance) => {
//           if (colInstance.columnTemplateId === columnTemplate.id) {
//             const newColInstance = { ...colInstance };
//             if (value) {
//               newColInstance.columnVariantInstances?.push({
//                 booleanValue: false,
//                 columnVariantTemplateId: givenColumnVariantTemplate.id,
//                 dateValue: new Date(),
//                 numberValue: 0,
//                 textValue: "",
//               });
//             } else {
//               console.log("before ", newColInstance.columnVariantInstances);
//               console.log(
//                 `givenColumnVariantTemplate.id: ${givenColumnVariantTemplate.id}`
//               );
//               newColInstance.columnVariantInstances =
//                 newColInstance.columnVariantInstances?.filter(
//                   (ele) =>
//                     ele.columnVariantTemplateId !==
//                     givenColumnVariantTemplate.id
//                 );
//               console.log("after ", newColInstance.columnVariantInstances);
//             }

//             return newColInstance;
//           }

//           return colInstance;
//         }
//       );
//     }

//     return fieldInstance;
//   };

//   const handleRemoveNextFollowUpColumns = (
//     columnInstances: ColumnInstance[],
//     nextFollowUpColumnTemplates: NextFollowUpColumnTemplate[]
//   ) => {
//     const filteredCols = columnInstances.map((col) => {
//       if (
//         !nextFollowUpColumnTemplates.some(
//           (ele) => ele.nextFollowUpColumnTemplateId === col.id
//         )
//       ) {
//         return col;
//       }
//     }) as ColumnInstance[];

//     return filteredCols;
//   };

//   const handleGetNextFollowUpColumns = (
//     givenColumnVariantTemplate: ColumnVariantTemplate,
//     fieldInstanceId: number
//   ) => {
//     const newCols: ColumnInstance[] = [];
//     console.log("taskTemplates:", taskTemplates);
//     for (let i = 0; i < taskTemplates.length; i++) {
//       const { functionTemplates } = taskTemplates[i];
//       for (let j = 0; j < functionTemplates.length; j++) {
//         const { fieldTemplates } = functionTemplates[j];
//         for (let k = 0; k < fieldTemplates.length; k++) {
//           const { columnTemplates } = fieldTemplates[k];
//           for (let l = 0; l < columnTemplates.length; l++) {
//             const { columnVariantTemplates } = columnTemplates[l];
//             if (columnVariantTemplates) {
//               for (let m = 0; m < columnVariantTemplates?.length; m++) {
//                 if (
//                   givenColumnVariantTemplate.id === columnVariantTemplates[m].id
//                 ) {
//                   const foundColumnTemplate = columnTemplates[l];
//                   console.log("foundColumnTemplate:", foundColumnTemplate);
//                   if (foundColumnTemplate) {
//                     const obj: ColumnInstance = {
//                       booleanValue: false,
//                       columnTemplateId: columnTemplates[l].id,
//                       dateValue: new Date().toString(),
//                       numberValue: 0,
//                       textValue: "",
//                       rowTableInstances: [],
//                       columnVariantInstances: [],
//                       fieldInstanceId,
//                       dropdownTemplateId:
//                         columnTemplates[l]?.dropdownTemplates?.[0]?.id ?? null,
//                     };
//                     if (columnTemplates[l].dropdownTemplates) {
//                       const { dropdownTemplates } = columnTemplates[l];
//                       if (dropdownTemplates && dropdownTemplates.length > 0) {
//                         obj.dropdownTemplateId =
//                           (dropdownTemplates[0].id as number) ?? null;
//                       }
//                     }

//                     newCols.push(obj);
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }

//     console.log("newCols:", newCols);

//     return newCols;
//   };

  return (
    <div className="h-100 d-flex justify-content-center gap-2 align-items-center">
      <Button
        type="button"
        variant="success"
        onClick={() => setOpenEditModal(true)}
        // disabled={field.isClosed}
      >
        <FaEye />
      </Button>
      <Modal
        open={openEditModal}
        onHide={() => setOpenEditModal(false)}
        backdrop
        centered
        size="xl"
        heading={
          <div className="d-flex align-items-center gap-2">
            <p>Edit</p>
            <p className="text-bg-secondary badge">{fieldTemplate.title}</p>
          </div>
        }
      >
        <EditColumn field={field} fn={fn} setFn={setFn} setOpenEditModal={setOpenEditModal} />
      </Modal>
      {/* <Button
        type="button"
        variant="danger"
        onClick={() => setOpenDeleteModal(true)}
        disabled={field.isClosed}
      >
        <MdOutlineDeleteOutline />
      </Button> */}
      <Modal
        open={openDeleteModal}
        onHide={() => setOpenDeleteModal(false)}
        backdrop
        centered
        size="lg"
        heading={
          <div className="d-flex align-items-center gap-2">
            <p>Delete</p>
            <p className="text-bg-secondary badge">{fieldTemplate.title}</p>
            <p>?</p>
          </div>
        }
      >
        <DeleteField onContinue={handleDeleteField} />
      </Modal>
      <Button
        type="button"
        variant="secondary"
        onClick={() => setOpenDoneModal(true)}
        disabled={!!field.closedAt}
      >
        <IoIosCheckmarkCircleOutline />
      </Button>
      <Modal
        open={openDoneModal}
        onHide={() => setOpenDoneModal(false)}
        backdrop
        centered
        size="lg"
        heading={
          <div className="d-flex align-items-center gap-2">
            <p>Done</p>
            <p className="text-bg-secondary badge">{fieldTemplate.title}</p>
            <p>?</p>
          </div>
        }
      >
        <DoneField onContinue={handleDoneField} />
      </Modal>
    </div>
  );
}
