import ColumnType from "./column-type"
import DepartmentType from "./department-type"


export interface DropdownTemplate {
    readonly id?: number | undefined | null;
    group: string;
    level: "TASK" | "FUNCTION" | "COLUMN";
    value: string;
    taskTemplateId?: null | undefined | number;
    functionTemplateId?: null | undefined | number;
    columnTemplateId?: null | undefined | number;
    createdAt: Date;
    updatedAt: Date;
}

export interface columnMetadataTemplate {
    readonly id?: number | null | undefined;
    type: ColumnType;
    acceptMultipleFiles: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface NextFollowUpColumnTemplate {
    readonly id?: number | null | undefined;
    columnTemplateId?: number | null | undefined;
    columnVariantTemplateId?: number | null | undefined;
    nextFollowUpColumnTemplateId?: number | null | undefined;
}

export interface ColumnVariantTemplate {
    readonly id?: number | null | undefined;
    name: string;
    valueType: ColumnType;
    targetedValue: string;
    nextFollowUpColumnTemplates?: NextFollowUpColumnTemplate[]
}

export interface ColumnTemplate {
    readonly id?: number | null | undefined;
    name: string;
    columnMetadataTemplate: columnMetadataTemplate,
    fieldTemplateId?: number | null | undefined;
    nextFollowUpColumnTemplates?: NextFollowUpColumnTemplate[];
    dropdownTemplates?: DropdownTemplate[];
    columnVariantTemplates?: ColumnVariantTemplate[];
    createdAt: Date;
    multipartFiles?: File[] | null,
    updatedAt: Date;
}

export interface FieldTemplate {
    id?: number | null | undefined;
    title: string;
    description: string;
    functionTemplateId?: number | null | undefined;
    columnTemplates: ColumnTemplate[];
    createdAt: Date;
    updatedAt: Date;
}

export interface FunctionTemplate {
    readonly id?: number | null | undefined;
    title: string;
    description: string;
    choice: boolean;
    department: DepartmentType;
    taskTemplatesId?: number | null | undefined;
    nextFollowUpFunctionTemplateId?: number | null | undefined;
    fieldTemplates: FieldTemplate[],
    dropdownTemplates?: DropdownTemplate[];
    type: "NORMAL" | "SPECIAL";
    multipartFiles?: File[] | null,
    createdAt: Date,
    updatedAt: Date
}

export default interface TaskTemplate {
    readonly id?: number | null | undefined;
    title: string;
    functionTemplates: FunctionTemplate[]
    dropdownTemplates?: DropdownTemplate[],
    createdAt: Date,
    updatedAt: Date
}