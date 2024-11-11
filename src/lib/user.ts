import DepartmentType from "./department-type";
import RoleType from "./role-type";

export interface Role {
    readonly id?: number | null | undefined;
    type: RoleType;
    departmentId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Department {
    readonly id?: number | null | undefined;
    name: DepartmentType;
    userId?: number;
    roles?: Role[]
    createdAt?: Date;
    updatedAt?: Date;
}

export default interface User {
    readonly id?: number | null | undefined;
    name: string;
    email: string;
    password?: string;
    phone: string;
    profileImage?: string;
    disabled: boolean;
    departments?: Department[];
    createdAt?: Date;
    updatedAt?: Date;
}
