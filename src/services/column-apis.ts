
import { ColumnInstance as Column } from "@/lib/task";
import { API } from "@/utils/api";

export const updateColumn = async (column: Column): Promise<Column> => {
    console.log("Updating column to api:", column);
    const response = await API.put(`/api/column-instances/${column.id}`, column);
    return response.data;
}

export const fetchFile = async (filePath: string): Promise<Blob> => {
    const response = await API.get(`/api/column-instances/get-files?filePath=${filePath}`, {
        responseType: 'blob'
    });
    console.log("Fetched File Data:", response.data);
    return new Blob([response.data]);
}

export const uploadFiles = async (column: Column, files: File[]): Promise<boolean> => {
    if (!files) {
        throw Error("Unable to upload file(s)");
    }
    const formData = new FormData();
    // Append the column data as a JSON string
    formData.append('column', new Blob([JSON.stringify(column)], { type: 'application/json' }));
    // Append each file to the FormData object
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }
    // Use axios or another method to send the form data
    const response = await API.post(`/api/column-instances/upload-files`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
}