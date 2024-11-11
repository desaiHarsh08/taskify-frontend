import { Customer } from "@/lib/customer";
import CustomerRow from "./CustomerRow";
const columns = [
  "",
  "Sr. No.",
  "#",
  "Name",
  "Person Of Contact",
  "Phone",
  "Addres",
  "City",
  "Pincode",
  "Actions",
];

type CustomersListProps = {
  customers: Customer[];
};
export default function CustomersList({ customers }: CustomersListProps) {
  return (
    <div className="border overflow-auto" style={{ height: "90%" }}>
      <div className="d-flex bg-light border-bottom" style={{ width: "1464px" }}>
        {columns.map((column, columnIndex) => {
          const columnWidth = { width: "12%" };
          if (columnIndex === 0) {
            columnWidth.width = "3%";
          } else if (columnIndex < 3) {
            columnWidth.width = "6.5%";
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
      <div
        id="customer-rows"
        className="border-bottom overflow-auto"
        
      >
        {customers.map((customer, customerIndex) => (
          <CustomerRow
            key={`customer-${customerIndex}`}
            customerIndex={customerIndex}
            customer={customer}
          />
        ))}
      </div>
    </div>
  );
}
