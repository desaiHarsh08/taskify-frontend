import { Customer } from "@/lib/customer";
import { PageResponse } from "@/lib/page-response";
import { API } from "@/utils/api";

export const fetchCustomers = async (page: number): Promise<PageResponse<Customer>> => {
    const response = await API.get(`/api/customers?page=${page}`);

    return response.data;
}

export const fetchCustomersByEmailCityOrState = async (page: number, email: string, city: string, state: string): Promise<PageResponse<Customer>> => {
    const response = await API.get(`/api/customers/filters?page=${page}&email=${email.trim() === '' ? null : email}&city=${city.trim() === '' ? null : city}&state=${state.trim() === '' ? null : state}`);
    console.log("fetch cus: for", page, email, city, state)
    console.log(response)
    return response.data;
}

export const searchCustomer = async (
    page: number,
    pincode: string,
    phone: string,
    customerName: string,
    personOfContact: string
): Promise<PageResponse<Customer>> => {
    const response = await API.get(`/api/customers/search?page=${page}&pincode=${pincode}&phone=${phone}&customerName=${customerName}&personOfContact=${personOfContact}`);
    console.log(response)
    return response.data;
}

export const createCustomer = async (newCustomer: Customer): Promise<Customer> => {
    const response = await API.post(`/api/customers`, newCustomer);

    return response.data;
}

export const editCustomer = async (customer: Customer): Promise<Customer> => {
    console.log("Updating customer:", customer);
    const response = await API.put(`/api/customers/${customer.id}`, customer);

    return response.data;
}

export const fetchCustomerById = async (id: number): Promise<Customer> => {
    const response = await API.get(`/api/customers/${id}`);

    return response.data;
}

export const deleteCustomer = async (id: number): Promise<Customer> => {
    const response = await API.delete(`/api/customers/${id}`);
    return response.data;
}