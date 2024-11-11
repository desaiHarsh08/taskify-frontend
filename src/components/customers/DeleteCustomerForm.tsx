import { toggleLoading } from "@/app/slices/loadingSlice";
import { toggleRefetch } from "@/app/slices/refetchSlice";
import { Customer } from "@/lib/customer";
import React from "react";
import { useDispatch } from "react-redux";
import Button from "../ui/Button";
import { deleteCustomer } from "@/services/customer-apis";

type DeleteCustomerFormProps = {
  customer: Customer;
};

export default function DeleteCustomerForm({
  customer,
}: DeleteCustomerFormProps) {
  const dispatch = useDispatch();

  const handleDeleteCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(toggleLoading());
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await deleteCustomer(customer.id as number);
      alert("Deleted!");
      dispatch(toggleRefetch());
    } catch (error) {
      console.log(error);
      alert("Unable to delete, Please try again later!");
    } finally {
      dispatch(toggleLoading());
    }
  };
  return (
    <form onSubmit={handleDeleteCustomer}>
      <p className="fs-5 pb-2">
        Are you sure that you want to delete this customer?
      </p>
      <p>
        This will delete all the related task associated with it and this
        process will not be undone.
      </p>
      <div className="d-flex justify-content-end my-2 mt-5">
        <Button variant={"danger"}>Delete</Button>
      </div>
    </form>
  );
}
