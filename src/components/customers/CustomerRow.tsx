import { FaEdit } from "react-icons/fa";
import Button from "../ui/Button";
import { MdOutlineDeleteOutline } from "react-icons/md";
import styles from "@/styles/CustomerRow.module.css";
import { Customer } from "@/lib/customer";
import Modal from "../ui/Modal";
import { useState } from "react";
import DeleteCustomerForm from "./DeleteCustomerForm";
import EditCustomerForm from "./EditCustomerForm";

type CustomerRowProps = {
  customer: Customer;
  customerIndex: number;
};

export default function CustomerRow({
  customer,
  customerIndex,
}: CustomerRowProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div
      className={`${styles["customer-row-card"]} d-flex border-bottom w-100`}
    >
      <p
        className="form-check border-end d-flex justify-content-center align-items-center px-0 py-3"
        style={{ width: "3%" }}
      >
        <input
          className="form-check-input m-0 "
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-3"
        style={{ width: "6.5%" }}
      >
        {customerIndex + 1}
      </p>
      <p
        className="border-end text-cente d-flex justify-content-center align-items-center py-3"
        style={{ width: "6.5%" }}
      >
        C{((customer?.id as number) + 1).toString().padStart(4, "0")}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-3"
        style={{ width: "12%" }}
      >
        {customer.name}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-3"
        style={{ width: "12%" }}
      >
        {customer.personOfContact}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-3"
        style={{ width: "12%" }}
      >
        {customer.phone}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-3"
        style={{ width: "12%" }}
      >
        {customer.address}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-3"
        style={{ width: "12%" }}
      >
        {customer.city}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-3"
        style={{ width: "12%" }}
      >
        {customer.pincode}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center gap-2 py-3"
        style={{ width: "12%" }}
      >
        <Button type="button" size="sm" onClick={() => setOpenEditModal(true)}>
          <FaEdit />
        </Button>
        <Modal
          open={openEditModal}
          onHide={() => setOpenEditModal(false)}
          backdrop
          centered
          size="lg"
          heading={`Edit: ${customer.name}`}
        >
          <EditCustomerForm
            customer={customer}
            setOpenModal={setOpenEditModal}
          />
        </Modal>

        <Button
          type="button"
          size="sm"
          variant="danger"
          onClick={() => setOpenDeleteModal(true)}
        >
          <MdOutlineDeleteOutline />
        </Button>
        <Modal
          open={openDeleteModal}
          onHide={() => setOpenDeleteModal(false)}
          size="lg"
          backdrop
          centered
          heading={`Delete: ${customer.name}`}
        >
          <DeleteCustomerForm customer={customer} />
        </Modal>
      </p>
    </div>
  );
}
