export interface Customer {
    id?: number | null | undefined;
    name: string;
    email?: string | null;
    personOfContact: string;
    phone: string;
    state: string;
    birthDate?: Date | string;
    anniversaryDate?: Date | string;
    address: string;
    residenceAddress: string;
    city: string;
    pincode: string;
    parentCompanyId: number | null;

}