import { ParentCompany } from "@/lib/parent-company";
import React from "react";
import Button from "../ui/Button";

type AddParentCompanyFormProps = {
  newParentCompany: ParentCompany;
  onNewParentCompanyChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function AddParentCompanyForm({
  newParentCompany,
  onNewParentCompanyChange,
  onSubmit,
}: AddParentCompanyFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div style={{ height: "400px" }} className="d-flex, overflow-y-auto">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={onNewParentCompanyChange}
            value={newParentCompany.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <input
            type="text"
            className="form-control"
            name="state"
            onChange={onNewParentCompanyChange}
            value={newParentCompany.state}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            name="city"
            onChange={onNewParentCompanyChange}
            value={newParentCompany.city}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pincode" className="form-label">
            Pincode
          </label>
          <input
            type="text"
            className="form-control"
            name="pincode"
            onChange={onNewParentCompanyChange}
            value={newParentCompany.pincode}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="headOfficeAddress" className="form-label">
            Head Office Address
          </label>
          <textarea
            className="form-control"
            rows={3}
            value={newParentCompany.headOfficeAddress}
            name="headOfficeAddress"
            onChange={onNewParentCompanyChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="personOfContact" className="form-label">
            Person Of Contact
          </label>
          <input
            type="text"
            className="form-control"
            name="personOfContact"
            onChange={onNewParentCompanyChange}
            value={newParentCompany.personOfContact}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="businessType" className="form-label">
            Business Type
          </label>
          <input
            type="text"
            className="form-control"
            name="businessType"
            onChange={onNewParentCompanyChange}
            value={newParentCompany.businessType}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            name="phone"
            onChange={onNewParentCompanyChange}
            value={newParentCompany.phone}
          />
        </div>
      </div>
      <div className="mb-3 d-flex justify-content-end mt-4">
        <Button>Add</Button>
      </div>
    </form>
  );
}
