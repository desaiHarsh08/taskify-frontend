import { Customer } from "@/lib/customer";
import styles from "@/styles/ExistingCustomerRow.module.css";

type ExistingCustomerRowProps = {
  customer: Customer;
  customerDetails: Customer;
  setCustomerDetails: React.Dispatch<React.SetStateAction<Customer>>;
  customerIndex: number;
};

export default function ExistingCustomerRow({
  customer,
  customerDetails,
  setCustomerDetails,
  customerIndex
}: ExistingCustomerRowProps) {
  const handleCustomerSelect = (givenCustomer: Customer) => {
    setCustomerDetails(givenCustomer);
  };

  return (
    <div
      className={`${styles["existing-customer-row"]} d-flex border-bottom w-100`}
      onClick={() => handleCustomerSelect(customer)}
    >
      <p
        className="form-check border-end d-flex justify-content-center align-items-center p-0"
        style={{ width: "3%" }}
      >
        <input
          className="form-check-input m-0 "
          type="radio"
          checked={customer?.id === customerDetails?.id}
        />
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-2"
        style={{ width: "5%" }}
      >
        {customerIndex + 1}.
      </p>
      <p
        className="border-end text-cente d-flex justify-content-center align-items-center py-2"
        style={{ width: "5%" }}
      >
        {`C${customer.id?.toString().padStart(4, '0')}`}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-2"
        style={{ width: "17%" }}
      >
        {customer.name}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-2"
        style={{ width: "17%" }}
      >
        {customer.personOfContact}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-2"
        style={{ width: "17%" }}
      >
        {customer.phone}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-2"
        style={{ width: "17%" }}
      >
        {customer.address}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-2"
        style={{ width: "17%" }}
      >
        {customer.city}
      </p>
      <p
        className="border-end text-center d-flex justify-content-center align-items-center py-2"
        style={{ width: "17%" }}
      >
        {customer.pincode}
      </p>
    </div>
  );
}
