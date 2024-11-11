
import { ColumnTemplate } from "@/lib/task-template";
import { API } from "@/utils/api";

export const fetchColumnTemplateById = async (columnTemplateId: number): Promise<ColumnTemplate> => {
    const response = await API.get(`/api/column-templates/${columnTemplateId}`);
    return response.data;
}
