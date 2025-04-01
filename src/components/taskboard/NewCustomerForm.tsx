/* eslint-disable @typescript-eslint/no-unused-vars */
import { Customer } from "@/lib/customer";
import Button from "../ui/Button";
import { ParentCompany } from "@/lib/parent-company";
import { useEffect, useState } from "react";
import { fetchParentCompaniesList } from "@/services/parent-companies-apis";

type NewCustomerFormProps = {
  onCustomerChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  customerDetails: Customer;
  setCustomerDetails: React.Dispatch<React.SetStateAction<Customer>>;
  onNavigateModal: (
    modalKey: keyof {
      taskType: boolean;
      taskPriority: boolean;
      customer: boolean;
      taskInfo: boolean;
      assignTask: boolean;
    }
  ) => void; // Define the keys in the type
};

export default function NewCustomerForm({
  customerDetails,
  setCustomerDetails,
  onNavigateModal,
  onCustomerChange,
}: NewCustomerFormProps) {
  const [parentCompanies, setParentCompanies] = useState<
    ParentCompany[] | null
  >();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchParentCompaniesList();
        console.log(response.content);
        setParentCompanies(response.content);
      } catch (error) {
        console.log(error);
      }
    })();
    setCustomerDetails((prev) => ({ ...prev, id: null }));
  }, []);

  return (
    <div className="d-flex flex-column justify-content-betwen h-100 ">
      <div
        className="d-flex justify-content-center overflow-y-auto"
        style={{ height: "500px" }}
      >
        <div className="w-75">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Party Name
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={onCustomerChange}
              value={customerDetails.name}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="personOfContact" className="form-label">
              Person of Contact
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="personOfContact"
              name="personOfContact"
              onChange={onCustomerChange}
              value={customerDetails.personOfContact}
              required
            />
          </div>
          <div className="d-flex gap-4">
            <div className="mb-3 w-50">
              <label htmlFor="phone" className="form-label">
                Phone
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                onChange={onCustomerChange}
                value={customerDetails.phone}
                required
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={onCustomerChange}
                value={customerDetails.email as string}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
              <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              onChange={onCustomerChange}
              value={customerDetails.address}
              rows={3}
            ></textarea>
          </div>
          <div className="d-flex gap-4">
            <div className="mb-3" style={{ width: "33%" }}>
              <label htmlFor="state" className="form-label">
                State
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                onChange={onCustomerChange}
                value={customerDetails.state}
                required
              />
            </div>
            <div className="mb-3" style={{ width: "33%" }}>
              <label htmlFor="city" className="form-label">
                City
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                onChange={onCustomerChange}
                value={customerDetails.city}
                required
              />
            </div>
            <div className="mb-3" style={{ width: "33%" }}>
              <label htmlFor="pincode" className="form-label">
                Pincode
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="pincode"
                name="pincode"
                onChange={onCustomerChange}
                value={customerDetails.pincode}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="gst" className="form-label">
              GST
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="gst"
              name="gst"
              onChange={onCustomerChange}
              value={customerDetails.gst}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pincode" className="form-label">
              Parent Company
              <span className="text-danger">*</span>
            </label>
            <select
              onChange={(e) =>
                setCustomerDetails((prev) => ({
                  ...prev,
                  parentCompanyId:
                    e.target.value == "NONE" ? null : Number(e.target.value),
                }))
              }
              value={
                customerDetails.parentCompanyId
                  ? (customerDetails.parentCompanyId as number)
                  : "NONE"
              }
              className="form-select"
              aria-label="Default select example"
            >
              {parentCompanies?.map((pc) => (
                <option value={pc.id}>{pc.name}</option>
              ))}
              <option value={"NONE"}>NONE</option>
            </select>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end gap-2 pt-5">
        <Button
          type="button"
          variant="secondary"
          onClick={() => onNavigateModal("taskPriority")}
        >
          Back
        </Button>
        <Button type="button" onClick={() => onNavigateModal("taskInfo")}>
          Continue
        </Button>
      </div>
    </div>
  );
}
