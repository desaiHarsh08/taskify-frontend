import { FaEdit } from "react-icons/fa";
import { MdDomainAdd } from "react-icons/md";

import { MdOutlineDeleteOutline } from "react-icons/md";

import Button from "../ui/Button";

export default function TaskPrototypeRow() {
  return (
    <div
      className="d-flex w-100 border-bottom rounded"
      style={{ paddingRight: "14px" }}
    >
      <p className="text-center py-2 m-0 border-end " style={{ width: "5%" }}>
        <input className="form-check-input" type="checkbox" />
      </p>
      <p className="text-center py-2 m-0 border-end " style={{ width: "10%" }}>
        1
      </p>
      <p
        className="text-center py-2 m-0 border-end "
        style={{ width: "21.25%" }}
      >
        NEW_SERVICE_INQUIRY
      </p>
      <p
        className="text-center py-2 m-0 border-end "
        style={{ width: "21.25%" }}
      >
        12
      </p>
      <p
        className="text-center py-2 m-0 border-end "
        style={{ width: "21.25%" }}
      >
        2
      </p>
      <p
        className="d-flex gap-2 justify-content-center text-center  py-2 m-0 border-end "
        style={{ width: "21.25%" }}
      >
        <Button variant="success" size="sm" disabled>
          <FaEdit />
        </Button>
        <Button variant="info" size="sm" disabled>
          <MdDomainAdd />
        </Button>
        <Button variant="danger" size="sm" disabled>
          <MdOutlineDeleteOutline />
        </Button>
      </p>
    </div>
  );
}
