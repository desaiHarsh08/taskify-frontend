import { ParentCompany } from "@/lib/parent-company";
import styles from "@/styles/ParentCompanyRow.module.css";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import AddParentCompanyForm from "./AddParentCompanyForm";
import { useDispatch } from "react-redux";
import { toggleLoading } from "@/app/slices/loadingSlice";
import { toggleRefetch } from "@/app/slices/refetchSlice";
import { updateParentCompany } from "@/services/parent-companies-apis";

type ParentCompanyRowProps = {
  parentCompany: ParentCompany;
  parentIndex: number;
};

export default function ParentCompanyRow({
  parentCompany,
  parentIndex,
}: ParentCompanyRowProps) {
  const dispatch = useDispatch();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [tmpParentCompany, setTmpParentCompany] = useState(parentCompany);

  const handleChangeParentCompany = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTmpParentCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(toggleLoading());
    try {
      const response = await updateParentCompany(tmpParentCompany);
      console.log(response);
      dispatch(toggleRefetch());
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
    }
  };

  return (
    <div className={`${styles["parent-row-card"]} d-flex border-bottom w-100`}>
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
        {parentIndex + 1}
      </p>
      <p
        className="border-end text-cente d-flex justify-content-center align-items-center py-3"
        style={{ width: "6.5%" }}
      >
        C{((parentCompany?.id as number) + 1).toString().padStart(4, "0")}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-3"
        style={{ width: "12%" }}
      >
        {parentCompany.name}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-3"
        style={{ width: "12%" }}
      >
        {parentCompany.personOfContact}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-3"
        style={{ width: "12%" }}
      >
        {parentCompany.phone}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-3"
        style={{ width: "12%" }}
      >
        {parentCompany.address}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-3"
        style={{ width: "12%" }}
      >
        {parentCompany.city}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-3"
        style={{ width: "12%" }}
      >
        {parentCompany.pincode}
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
          heading={`Edit: ${parentCompany.name}`}
        >
          <AddParentCompanyForm
            newParentCompany={tmpParentCompany}
            onNewParentCompanyChange={handleChangeParentCompany}
            onSubmit={handleSubmit}
          />
        </Modal>

        {/* <Button type="button" size="sm" variant="danger" onClick={() => {}}>
          <MdOutlineDeleteOutline />
        </Button>
        <Modal
          open={false}
          onHide={() => {}}
          size="lg"
          backdrop
          centered
          heading={`Delete: ${parentCompany.companyName}`}
        >
        </Modal> */}
      </p>
    </div>
  );
}
