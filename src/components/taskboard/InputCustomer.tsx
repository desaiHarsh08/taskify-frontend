import { useState } from "react";
import Button from "../ui/Button";

import NewCustomerForm from "./NewCustomerForm";
import ExistingCustomers from "./ExistingCustomers";
import { Customer } from "@/lib/customer";

type InputCustomerProps = {
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
  ) => void; // Define the keys in the type;
  customerTabs: {
    label: string;
    isSelected: boolean;
  }[];
  setCustomersTabs: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        isSelected: boolean;
      }[]
    >
  >;
};

export default function InputCustomer({
  onNavigateModal,
  customerDetails,
  setCustomerDetails,
  customerTabs,
  setCustomersTabs,
}: InputCustomerProps) {
  const [newCustomer, setNewCustomer] = useState<Customer>(customerDetails);

  const handleTabClick = (index: number) => {
    const newtTabs = customerTabs.map((tab, idx) => {
      if (index === idx) {
        tab.isSelected = true;
      } else {
        tab.isSelected = false;
      }

      return tab;
    });

    setCustomersTabs(newtTabs);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="p-0 d-flex flex-column justify-content-evenly"
      style={{ height: "75vh" }}
    >
      <ul
        className="p-0 d-flex gap-2 border-bottom pb-3"
        style={{ listStyle: "none" }}
      >
        {customerTabs.map((tab, index) => (
          <li key={tab.label}>
            <Button
              type="button"
              variant="secondary"
              outline={!tab.isSelected}
              onClick={() => handleTabClick(index)}
              size="sm"
              //   disabled={index === 1}
            >
              {tab.label.toUpperCase()}
            </Button>
          </li>
        ))}
      </ul>
      <div id="customer-area" className="overflow-auto">
        {customerTabs.map((tab) => {
          if (tab.label === "NEW" && tab.isSelected) {
            return (
              <NewCustomerForm
                customerDetails={newCustomer}
                onCustomerChange={handleChange}
                setCustomerDetails={setNewCustomer}
                onNavigateModal={onNavigateModal}
              />
            );
          } else if (tab.label === "EXISTING" && tab.isSelected) {
            return (
              <ExistingCustomers
                customerDetails={customerDetails}
                setCustomerDetails={setCustomerDetails}
                onNavigateModal={onNavigateModal}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
