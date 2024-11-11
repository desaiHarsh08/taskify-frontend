import TaskTemplate from "@/lib/task-template";
import { API } from "@/utils/api";

export const fetchTaskTemplateById = async (taskTemplateId: number): Promise<TaskTemplate> => {
    const response = await API.get(`/api/task-templates/${taskTemplateId}`);
    return response.data;
}