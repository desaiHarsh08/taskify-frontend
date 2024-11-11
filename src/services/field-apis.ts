import { FieldInstance } from "@/lib/task";
import { API } from "@/utils/api";

export const createField = async (field: FieldInstance): Promise<FieldInstance> => {
    const response = await API.post(`/api/field-instances`, field);
    return response.data;
}

export const closeField = async (field: FieldInstance, userId: number): Promise<FieldInstance> => {
    const response = await API.put(`/api/field-instances/close/${field.id}?closedByUserId=${userId}`);
    return response.data;
}

export const deleteField = async (fieldId: number): Promise<FieldInstance> => {
    const response = await API.delete(`/api/field-instances/${fieldId}`);
    return response.data;
}