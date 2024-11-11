import Button from "../ui/Button";

import InputFunctionCard from "./InputFunctionCard";
import NewFunctionCard from "./NewFunctionCard";

export default function InputFunctions() {
  // const
  return (
    <div className="container" style={{ height: "450px" }}>
      <div className="d-flex gap-2 border-bottom pb-3">
        <Button outline={false} variant="secondary" type="button">
          New Function
        </Button>
        <Button outline={true} variant="secondary" type="button">
          Existing Function
        </Button>
      </div>
      <div className="d-flex" style={{ height: "85%" }}>
        <div
          className="w-25 d-flex flex-column gap-4 border-end p-1 py-3 px-2 overflow-y-scroll"
          style={{ height: "381px" }}
        >
          <InputFunctionCard />
          <InputFunctionCard />
        </div>
        <div className="w-75 p-2 px-4 py-3 overflow-y-auto" style={{ height: "381px" }}>
          <NewFunctionCard />
        </div>
      </div>
    </div>
  );
}
