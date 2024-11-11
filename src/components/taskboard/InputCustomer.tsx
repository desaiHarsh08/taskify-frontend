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
  ) => void; // Define the keys in the type
};

export default function InputCustomer({
  onNavigateModal,
  customerDetails,
  setCustomerDetails,
}: InputCustomerProps) {
  const [tabs, setTabs] = useState([
    { label: "NEW", isSelected: true },
    { label: "EXISTING", isSelected: false },
  ]);

  const handleTabClick = (index: number) => {
    const newtTabs = tabs.map((tab, idx) => {
      if (index === idx) {
        tab.isSelected = true;
      } else {
        tab.isSelected = false;
      }

      return tab;
    });

    setTabs(newtTabs);
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
        {tabs.map((tab, index) => (
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
        {tabs.map((tab) => {
          if (tab.label === "NEW" && tab.isSelected) {
            return (
              <NewCustomerForm
                customerDetails={customerDetails}
                setCustomerDetails={setCustomerDetails}
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
