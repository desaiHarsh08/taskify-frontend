import ActionType from "./action-type";
import ResourceType from "./resource-type";

export interface ActivityLog {
    id?: number;
    userId: number;
    resourceType: ResourceType;
    actionType: ActionType;
    atDate: Date;
    taskInstanceId: number | null;
    functionInstanceId: number | null;
    fieldInstanceId: number | null;
    createdAt: Date;
    updatedAt: Date;
}