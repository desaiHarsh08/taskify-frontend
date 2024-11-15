/* eslint-disable @typescript-eslint/no-unused-vars */
import { Customer } from "@/lib/customer";
import Button from "../ui/Button";
import { ParentCompany } from "@/lib/parent-company";
import { useEffect, useState } from "react";
import { fetchParentCompaniesList } from "@/services/parent-companies-apis";

type NewCustomerFormProps = {
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
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex flex-column justify-content-betwen h-100 ">
      <div
        className="d-flex justify-content-center overflow-y-auto"
        style={{ height: "500px" }}
      >
        <div className="w-75">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Customer Name
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={handleChange}
              value={customerDetails.name}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleChange}
              value={customerDetails.email as string}
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
              onChange={handleChange}
              value={customerDetails.personOfContact}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              onChange={handleChange}
              value={customerDetails.phone}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              onChange={handleChange}
              value={customerDetails.state}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              onChange={handleChange}
              value={customerDetails.city}
              required
            />
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
              onChange={handleChange}
              value={customerDetails.address}
              rows={3}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="pincode" className="form-label">
              Pincode
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="pincode"
              name="pincode"
              onChange={handleChange}
              value={customerDetails.pincode}
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
                    e.target.value === "NONE" ? null : Number(e.target.value),
                }))
              }
              value={customerDetails.parentCompanyId as number}
              className="form-select"
              aria-label="Default select example"
            >
              {parentCompanies?.map((pc) => (
                <option value={pc.id}>{pc.name}</option>
              ))}
              {/* <option value={"NONE"}>NONE</option> */}
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
