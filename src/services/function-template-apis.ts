import { FunctionTemplate } from "@/lib/task-template";
import { API } from "@/utils/api";

export const fetchFunctionTemplateById = async (id: number): Promise<FunctionTemplate> => {
    const response = await API.get(`/api/function-templates/${id}`);
    return response.data;
}