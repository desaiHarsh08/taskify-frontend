/* eslint-disable @typescript-eslint/no-unused-vars */
import { Customer } from "@/lib/customer";
import Button from "../ui/Button";
import ExistingCustomerRow from "./ExistingCustomerRow";
import React, { useEffect, useState } from "react";
import { fetchCustomers, searchCustomer } from "@/services/customer-apis";
import Pagination from "../global/Pagination";

const columns = [
  "",
  "Sr. No.",
  "#",
  "Party Name",
  "Person Of Contact",
  "Phone",
  "Addres",
  "City",
  "Pincode",
];

type ExistingCustomersProps = {
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

export default function ExistingCustomers({
  customerDetails,
  setCustomerDetails,
  onNavigateModal,
}: ExistingCustomersProps) {
  const [pageData, setPageData] = useState({
    pageNumber: 1,
    pageSize: 1,
    totalPages: 1,
    totalRecords: 0,
  });
  const [searchQuery, setSearchQuery] = useState({
    customerName: "",
    phone: "",
    personOfContact: "",
    pincode: "",
  });
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    setCustomerDetails({
      id: null,
      name: "",
      email: "",
      personOfContact: "",
      phone: "",
      state: "",
      birthDate: new Date(),
      anniversaryDate: new Date(),
      address: "",
      residenceAddress: "",
      city: "",
      pincode: "",
      parentCompanyId: null,
    });
  }, [setCustomerDetails]);

  useEffect(() => {
    getCustomers();
  }, [pageData.pageNumber]);

  const getCustomers = async () => {
    fetchCustomers(pageData.pageNumber)
      .then((data) => {
        console.log(data);
        setCustomers(data.content);
        setCustomerDetails(data.content[0]);
        setPageData({
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalPages: data.totalPages,
          totalRecords: data.totatRecords,
        });
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSearchQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await searchCustomer(
        pageData.pageNumber,
        searchQuery.pincode,
        searchQuery.phone,
        searchQuery.customerName,
        searchQuery.personOfContact
      );
      setPageData({
        pageNumber: response.pageNumber,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalRecords: response.totatRecords,
      });
      setCustomers(response.content);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-between h-100 gap-2">
      <form className="d-flex gap-2 mb-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="search"
            className="form-control"
            name="customerName"
            aria-describedby="emailHelp"
            placeholder="type name..."
            value={searchQuery.customerName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="search"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="type poc..."
            name="personOfContact"
            value={searchQuery.personOfContact}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="search"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="type phone..."
            name="phone"
            value={searchQuery.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="search"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="type pincode..."
            name="pincode"
            value={searchQuery.pincode}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <Button>Search</Button>
        </div>
      </form>
      <div className="border overflow-auto" style={{ height: "500px" }}>
        <div
          className="d-flex bg-light border-bottom"
          style={{ minWidth: "1108px", overflow: "auto" }}
        >
          {columns.map((column, columnIndex) => {
            const columnWidth = { width: "17%" };
            if (columnIndex === 0) {
              columnWidth.width = "3%";
            } else if (columnIndex < 3) {
              columnWidth.width = "5%";
            }

            return (
              <p
                className="border-end py-1 text-center fw-bold"
                style={columnWidth}
              >
                {column}
              </p>
            );
          })}
        </div>
        <div className="overflow-auto">
          {customers.map((customer, customerIndex) => (
            <ExistingCustomerRow
              key={`customer-${customerIndex}`}
              customer={customer}
              customerDetails={customerDetails}
              customerIndex={customerIndex}
              setCustomerDetails={setCustomerDetails}
            />
          ))}
        </div>
      </div>
      <Pagination
        setPageData={setPageData}
        totalRecords={pageData.totalRecords}
        pageNumber={pageData.pageNumber}
        totalPages={pageData.totalPages}
        pageSize={pageData.pageSize}
      />
      <div className="d-flex justify-content-end gap-2">
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
