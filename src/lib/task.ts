
import PriorityType from "./priority-type";

export interface ColTableInstance {
    readonly id?: number | null | undefined;
    columnInstanceId?: number,
    textValue: string | null;
    dateValue: string | null | Date;
    booleanValue: boolean | null;
    createdAt?: Date | string | string;
    updatedAt?: Date | null | string;
}

export interface ColumnVariantInstance {
    readonly id?: number | null | undefined;
    columnVariantTemplateId: number | null | undefined;
    numberValue: number | null;
    textValue: string | null;
    dateValue: string | null | Date;
    booleanValue: boolean | null;
    createdAt?: Date | string | string;
    updatedAt?: Date | null | string;
    
}

export interface RowTableInstance {
    readonly id?: number | null | undefined;
    columnInstanceId?: number
    colTableInstances?: ColTableInstance[];
    createdAt?: Date | string | string;
    updatedAt?: Date | null | string;
}

export interface ColumnInstance {
    readonly id?: number | null | undefined;
    columnTemplateId: number | null | undefined;
    fieldInstanceId?: number | null | undefined;
    dropdownTemplateId?: number | null;
    columnVariantInstances: ColumnVariantInstance[];
    rowTableInstances: RowTableInstance[]
    numberValue: number | null;
    textValue: string | null;
    dateValue: string | null;
    booleanValue: boolean | null;
    filePaths?: string[];
    multipartFiles?: File[] | null,
    createdAt?: Date | string | string;
    updatedAt?: Date | null | string;
}

export interface FieldInstance {
    readonly id?: number | null | undefined;
    fieldTemplateId: number | null;
    functionInstanceId?: number | null | undefined;
    createdByUserId: number | null | undefined;
    closedByUserId?: number | null | undefined;
    columnInstances: ColumnInstance[];
    createdAt?: Date | string;
    updatedAt?: Date | null | string;
    closedAt?: Date | null | string;
}


export interface FunctionInstance {
    readonly id?: number | null | undefined;
    functionTemplateId: number | null | undefined;
    taskInstanceId?: number | null | undefined;
    createdByUserId: number | null | undefined;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    dropdownTemplateId?: null | number
    dueDate: Date | string;
    closedByUserId?: number | null | undefined;
    closedAt?: Date | null | string;
    fieldInstances: FieldInstance[];
    remarks?: string;
    filePaths?: string[];
    multipartFiles?: File[],
}



export default interface TaskInstance {
    readonly id?: number;
    taskTemplateId: number | null | undefined;
    customerId: number;
    priorityType: PriorityType;
    createdByUserId: number | null | undefined;
    assignedToUserId: number | null | undefined;
    createdDate?: Date | string;
    closedByUserId?: number | null;
    closedAt?: Date | null;
    dropdownTemplateId?: null | number;
    functionInstances?: FunctionInstance[];
    abbreviation?: string;
    pumpType: string | null;
    pumpManufacturer: string | null;
    specifications: string | null;
    requirements: string | null;
    problemDescription: string | null;
    archived?: boolean;
    createdAt?: Date | null | string | undefined;
    updatedAt?: Date | null | string | undefined;
}
