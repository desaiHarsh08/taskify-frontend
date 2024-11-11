import { Customer } from "@/lib/customer";
import Task from "@/lib/task";
import { fetchCustomerById } from "@/services/customer-apis";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import EditCustomerForm from "../customers/EditCustomerForm";
import { useSelector } from "react-redux";
import { selectRefetch } from "@/app/slices/refetchSlice";

type CustomerInfoProps = {
  task: Task;
};

export default function CustomerInfo({ task }: CustomerInfoProps) {
  const refectFlag = useSelector(selectRefetch);

  const [openModal, setOpenModal] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchCustomerById(task.customerId);
        if (response.birthDate == null) {
          response.birthDate = dateFormat(null);
        }
        if (response.anniversaryDate == null) {
          response.anniversaryDate = dateFormat(null);
        }

        console.log("Fetched and auto date:", response)
        setCustomer(response);
      } catch (error) {
        console.log(error);
        // alert("Unable to fetch customer!");
      }
    })();
  }, [task.customerId, refectFlag]);

  const dateFormat = (date: string | Date | null) => {
    let tmpDate = new Date();
    if (date) {
      tmpDate = new Date(date);
    }
    const formattedDate = `${tmpDate.getFullYear()}-${(tmpDate.getMonth() + 1).toString().padStart(2, "0")}-${tmpDate.getDate().toString().padStart(2, "0")}`;

    return formattedDate;
  };

  return (
    <div>
      <ul
        className="px-2 d-flex flex-column gap-2"
        style={{ listStyle: "none" }}
      >
        <li className="d-flex gap-2">
          <p style={{ width: "149px" }}>Name:</p>
          <p>{customer?.name}</p>
        </li>
        <li className="d-flex gap-2">
          <p style={{ width: "149px" }}>Person of Contact:</p>
          <p>{customer?.personOfContact}</p>
        </li>
        <li className="d-flex gap-2">
          <p style={{ width: "149px" }}>Phone:</p>
          <p>{customer?.phone}</p>
        </li>
        <li className="d-flex gap-2">
          <p style={{ minWidth: "149px" }}>Address:</p>
          <p>{customer?.address}</p>
        </li>
        <li className="d-flex gap-2">
          <p style={{ width: "149px" }}>City:</p>
          <p>{customer?.city}</p>
        </li>
        <li className="d-flex gap-2">
          <p style={{ width: "149px" }}>Pincode:</p>
          <p>{customer?.pincode}</p>
        </li>
      </ul>
      <Button variant={"success"} onClick={() => setOpenModal(true)}>
        Edit
      </Button>
      <Modal
        open={openModal}
        onHide={() => setOpenModal(false)}
        heading={`Edit: ${customer?.name}`}
        backdrop
        centered
        size="lg"
      >
        {customer && (
          <EditCustomerForm customer={customer} setOpenModal={setOpenModal} />
        )}
      </Modal>
    </div>
  );
}
