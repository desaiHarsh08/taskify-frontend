import PriorityType from "./priority-type";

export interface PumpDetails {
    pumpMake: string;
    pumpType: string;
    stage: string;
    serialNumber: string;
    motorMake: string;
    hp: string;
    volts: string;
    phase: string;
}

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
    pumpDetails: PumpDetails | null;
    receiptNoteCreatedAt?: Date | string | null;
}
