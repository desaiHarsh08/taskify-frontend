import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";

export default function InputFunctionCard() {
  return (
    <div className="card">
      <p className="card-header">Prepare Quotation</p>
      <div className="d-flex px-2 m-1 justify-content-between align-items-center ">
        <p className="px-3 rounded bg-info">QUOTATION</p>
        <p style={{ cursor: "pointer" }} className="d-flex gap-2">
          <IoEyeOutline className="fs-5" />
          <MdOutlineDeleteOutline className="fs-5" />
        </p>
      </div>
    </div>
  );
}
