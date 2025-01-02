import PriorityType from "./priority-type";

export default interface TaskSummary {
    readonly id: number;
    readonly taskTemplateId: number;
    abbreviation: string;
    customerId: number;
    jobNumber: string | null;
    functionId: number;
    priorityType: PriorityType;
    closedAt?: Date | string | null;
    updatedAt?: Date | string | null;
}
