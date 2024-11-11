import { FieldTemplate } from "@/lib/task-template";
import { API } from "@/utils/api";

export const fetchFieldTemplateById = async (fieldTemplateId: number): Promise<FieldTemplate> => {
    const response = await API.get(`/api/field-templates/${fieldTemplateId}`);
    return response.data;
}