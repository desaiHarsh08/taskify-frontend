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

export interface Permission {
    readonly id?: number;
    type: string;
    viewTaskId: number;
}

export interface ViewTask {
    readonly id?: number;
    taskType: DepartmentType;
    userId?: number;
    permissions: Permission[]
}

export default interface User {
    readonly id?: number | null | undefined;
    name: string;
    email: string;
    password?: string;
    phone: string;
    admin: boolean;
    profileImage?: string;
    disabled: boolean;
    departments?: Department[];
    viewTasks: ViewTask[],
    createdAt?: Date;
    updatedAt?: Date;
}
