import { toggleLoading } from "@/app/slices/loadingSlice";
import Button from "@/components/ui/Button";
import MyToast from "@/components/ui/MyToast";
import { Customer } from "@/lib/customer";
import { ParentCompany } from "@/lib/parent-company";
import { createCustomer } from "@/services/customer-apis";
import { fetchParentCompaniesList } from "@/services/parent-companies-apis";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function AddCustomer() {
  const dispatch = useDispatch();

  const [parentCompanies, setParentCompanies] = useState<
    ParentCompany[] | null
  >();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [customerDetails, setCustomerDetails] = useState<Customer>({
    name: "",
    email: "",
    personOfContact: "",
    phone: "",
    state: "",
    address: "",
    residenceAddress: "",
    city: "",
    pincode: "",
    parentCompanyId: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchParentCompaniesList();
        console.log(response);
        setParentCompanies(response);
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

  const handleSubmit = async () => {
    dispatch(toggleLoading());
    try {
      const response = await createCustomer(customerDetails);
      console.log(response);
      setShowToast(true);
      setMessage("New Customer Created!");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
    }
  };

  return (
    <div className="p-3  border h-100">
      <div className="mb-3">
        <h2>Add Customer</h2>
      </div>
      <div
        className="d-flex flex-column align-items-start"
        style={{ height: "90%" }}
      >
        <div className="w-75 d-flex justify-content-center overflow-y-auto h-100">
          <div className="w-100">
            <div className="mb-3 w-100">
              <label htmlFor="customerName" className="form-label">
                Customer Name
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="customerName"
                name="customerName"
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
                    parentCompanyId: e.target.value === 'NONE' ? null : Number(e.target.value),
                  }))
                }
                className="form-select"
                aria-label="Default select example"
              >
                {parentCompanies?.map((pc) => (
                  <option value={pc.id}>{pc.name}</option>
                ))}
                <option value={'NONE'}>NONE</option>
              </select>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 pt-5">
          <Button type="button" onClick={handleSubmit}>
            Continue
          </Button>
        </div>
      </div>
      <MyToast
        show={showToast}
        message={message}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
