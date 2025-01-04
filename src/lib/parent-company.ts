import { Customer } from "./customer";

export interface ParentCompany {
    id?: number;
    name: string;
    email?: string;
    state: string;
    city: string;
    pincode: string;
    headOfficeAddress: string;
    personOfContact: string;
    phone: string;
    businessType: string;
    remark?: string;
    customers?: Customer[]
}