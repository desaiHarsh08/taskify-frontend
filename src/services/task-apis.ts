import { MonthlyStats } from "@/lib/monthly-stats";
import { PageResponse } from "@/lib/page-response";
import Task from "@/lib/task";
import TaskPrototype from "@/lib/task-template";
import { TaskStats } from "@/lib/task-stats";
import { API } from "@/utils/api";
import TaskSummary from "@/lib/task-summary";

export const fetchTaskTemplates = async (page: number): Promise<TaskPrototype[]> => {
    const response = await API.get(`/api/task-templates?page=${page}&pageSize=10`);
    return response.data;
}

export const createTask = async (newTask: Task): Promise<Task> => {
    console.log("Given new task :", newTask);
    const response = await API.post(`/api/task-instances`, newTask);
    return response.data;
}

export const fetchAllTasks = async (page: number): Promise<PageResponse<TaskSummary>> => {
    const response = await API.get(`/api/task-instances?page=${page}&pageSize=10`);
    return response.data;
}

export const fetchDismantleDueTasks = async (page: number): Promise<PageResponse<TaskSummary>> => {
    const response = await API.get(`/api/task-instances/dismantle-due?page=${page}&pageSize=10`);
    return response.data;
}

export type FilterBy = "Dismantle Due"
    | "Estimate Due"
    | "Pending Approval"
    | "Approval Received"
    | "Approval Reject"
    | "Awaiting Approval"
    | "Work in Progress"
    | "Ready"
    | "Pending Bills"
    | "Lathe";

    

export const fetchTasksByFilters = async (page: number, filterBy: FilterBy, status: boolean): Promise<PageResponse<TaskSummary>> => {
    const response = await API.get(`/api/task-instances/custom-filter?page=${page}&pageSize=10&status=${status}&filterBy=${filterBy}`);
    return response.data;
}

export const fetchEstimateDueTasks = async (page: number): Promise<PageResponse<TaskSummary>> => {
    const response = await API.get(`/api/task-instances/estimate-due?page=${page}&pageSize=10`);
    return response.data;
}

export const fetchPendingApprovalDueTasks = async (page: number): Promise<PageResponse<TaskSummary>> => {
    const response = await API.get(`/api/task-instances/pending-approval?page=${page}&pageSize=10`);
    return response.data;
}

export const fetchApprovalStatusTasks = async (page: number, status: boolean): Promise<PageResponse<TaskSummary>> => {
    const response = await API.get(`/api/task-instances/approval-status?page=${page}&pageSize=10&status=${status}`);
    return response.data;
}

export const fetchTasksByAssignedUserId = async (page: number, assignedUserId: number): Promise<PageResponse<TaskSummary>> => {
    const response = await API.get(`/api/task-instances/by-assigned-user?page=${page}&pageSize=10&assignedUserId=${assignedUserId}`);
    return response.data;
}

export const fetchStats = async (): Promise<TaskStats> => {
    const response = await API.get(`/api/analytics/overall-stats`);
    return response.data;
}

export const fetchMonthlyStats = async (): Promise<MonthlyStats> => {
    const response = await API.get(`/api/analytics/monthly-stats`);
    return response.data;
}

export const fetchTasksByAbbreviationOrDate = async (page: number, abbreviation: string, date: string | Date): Promise<PageResponse<TaskSummary>> => {
    const response = await API.get(`/api/task-instances/abbreviation-date?page=${page}&pageSize=10&abbreviation=${abbreviation}&date=${date}`);
    return response.data;
}

export const getSearchTask = async (searchText: string, page: number): Promise<PageResponse<TaskSummary>> => {
    const response = await API.get(`/api/task-instances/search?searchTxt=${searchText}&page=${page}&pageSize=10`);
    return response.data;
}

export const fetchTaskById = async (taskId: number): Promise<Task> => {
    console.log("fetching taskId:", taskId);
    const response = await API.get(`/api/task-instances/${taskId}`);
    console.log(response);
    return response.data;
}

export const fetchTaskByPriority = async (page: number, priority: string): Promise<PageResponse<TaskSummary>> => {
    const response = await API.get(`/api/task-instances/priority/${priority}?page=${page}&pageSize=10`);
    console.log(response);
    return response.data;
}

export const fetchOverdueTasks = async (page: number): Promise<PageResponse<TaskSummary>> => {
    // /api/task-instances/overdue?page=1
    const response = await API.get(`/api/task-instances/overdue?page=${page}&pageSize=1000`);
    console.log(response);
    return response.data;
}

export const fetchPendingTasks = async (page: number): Promise<PageResponse<TaskSummary>> => {
    const response = await API.get(`/api/task-instances/is-closed?page=${page}&isClosed=${false}&pageSize=10`);
    console.log(response);
    return response.data;
}

export const fetchClosedTasks = async (page: number): Promise<PageResponse<TaskSummary>> => {
    const response = await API.get(`/api/task-instances/is-closed?page=${page}&isClosed=${true}&pageSize=10`);
    console.log(response);
    return response.data;
}

export const deleteTask = async (taskId: number): Promise<Task> => {
    const response = await API.delete(`/api/task-instances/${taskId}`);
    return response.data;
}

export const doCloseTask = async (taskId: number, userId: number): Promise<Task> => {
    const response = await API.get(`/api/task-instances/close/${taskId}?userId=${userId}`);
    return response.data;
}

export const updateTask = async (task: Task, userId: number): Promise<Task> => {
    const response = await API.put(`/api/task-instances/${task.id}?userId=${userId}`, task);
    return response.data;
}

export const fetchTaskByAbbreviation = async (taskAbbreviation: string): Promise<Task> => {
    const response = await API.get(`/api/task-instances/abbreviation/${taskAbbreviation}`);
    console.log(response);
    return response.data;
}

export const fetchTaskSummaryById = async (id: number): Promise<TaskSummary | null> => {
    const response = await API.get(`/api/task-instances/task-summary/${id}`);
    console.log(response);
    return response.data;
}