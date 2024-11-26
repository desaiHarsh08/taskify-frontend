import PriorityType from "./priority-type";
import { Department } from "./user";

export default interface TaskSummary {
    readonly id?: number;
    abbreviation: string;
    customerName: string;
    jobNumber: string;
    department: Department;
    functionName: string;
    priorityType: PriorityType;
    updatedAt: Date | string | null;
}
