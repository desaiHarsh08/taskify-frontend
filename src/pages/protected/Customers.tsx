import Button from "@/components/ui/Button";
import CustomersList from "@/components/customers/CustomersList";
import { useEffect, useState } from "react";
import { Customer } from "@/lib/customer";
import {
  searchCustomer,
} from "@/services/customer-apis";
import { useSelector } from "react-redux";
import Pagination from "@/components/global/Pagination";
import { selectRefetch } from "@/app/slices/refetchSlice";

export default function Customers() {

  const refetchFlag = useSelector(selectRefetch);

  const [pageData, setPageData] = useState({
    pageNumber: 1,
    pageSize: 0,
    totalPages: 0,
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
    getCustomersData(pageData.pageNumber);
  }, [refetchFlag, pageData.pageNumber]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSearchQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getCustomersData = async (pageNumber: number) => {
    try {
      const response = await searchCustomer(
        pageNumber,
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

  const handleReset = () => {
    setSearchQuery({
      customerName: "",
      phone: "",
      personOfContact: "",
      pincode: "",
    });
    getCustomersData(1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPageData((prev) => ({ ...prev, pageNumber: 1 }));
    getCustomersData(1);
  };

  return (
    <div className="p-3 h-100">
      <div className="page-intro">
        <h2>Customers</h2>
        <p>View all of our customers from here!</p>
      </div>
      <div id="customer-filters" className="py-3 ">
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
          <div className="mb-3 d-flex gap-2">
            <Button>Search</Button>
            <Button type="button" variant="secondary"  onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </div>
      <div id="customer-container">
        <CustomersList customers={customers} />
        <div className="" style={{ height: "10%" }}>
          <Pagination
            pageNumber={pageData.pageNumber}
            totalPages={pageData.totalPages}
            setPageData={setPageData}
          />
        </div>
      </div>
    </div>
  );
}
