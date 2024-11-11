import { ParentCompany } from "@/lib/parent-company";
import ParentCompanyRow from "./ParentCompanyRow";

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

type ParentCompaniesListProps = {
  parentCompanies: ParentCompany[];
};

export default function ParentCompaniesList({
  parentCompanies,
}: ParentCompaniesListProps) {
  return (
    <div className="overflow-auto mb-3 w-100" style={{ height: "90%" }}>
      <div
        className="d-flex bg-light border-bottom border"
        style={{ width: "1464px" }}
      >
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
        id="parent-rows"
        className="overflow-auto border"
        style={{ maxHeight: "500px", width: "1464px" }}
      >
        {parentCompanies.map((parentCompany, parentIndex) => (
          <ParentCompanyRow
            key={`parent-${parentIndex}`}
            parentCompany={parentCompany}
            parentIndex={parentIndex}
          />
        ))}
      </div>
    </div>
  );
}
