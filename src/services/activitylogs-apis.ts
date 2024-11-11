import { PageResponse } from "@/lib/page-response";
import { ActivityLog } from "@/lib/activity-log";
import { API } from "@/utils/api";

export const fetchActivityLogs = async (page: number, date: string): Promise<PageResponse<ActivityLog>> => {
    const response = await API.get(`/api/activities/date?page=${page}&date=${date}`);
    return response.data;
}

export const fetchActivityLogsByMonthAndYear = async (page: number, month: number, year: number): Promise<PageResponse<ActivityLog>> => {
    const response = await API.get(`/api/activities/filters?page=${page}&month=${month}&year=${year}`);
    return response.data;
}