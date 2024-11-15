import { FunctionInstance } from "@/lib/task";
import { API } from "@/utils/api";

export const createFunction = async (newFunction: FunctionInstance, assignedToUserId: number): Promise<FunctionInstance> => {
    console.log("in api, creating fn:", newFunction);
    const { multipartFiles, ...tmpFn } = newFunction;
    console.log("in api, creating fn:", tmpFn);
    const response = await API.post(`/api/function-instances?assignedToUserId=${assignedToUserId}`, tmpFn);

    return response.data;
}

export const fetchFunctionById = async (functionId: number): Promise<FunctionInstance> => {
    const response = await API.get(`/api/function-instances/${functionId}`);
    console.log(response);
    return response.data;
}

export const fetchFunctionByTaskInstanceId = async (taskInstanceId: number): Promise<FunctionInstance[]> => {
    const response = await API.get(`/api/function-instances/task-instance/${taskInstanceId}`);
    console.log(response);
    return response.data;
}

export const doCloseFunction = async (_fn: FunctionInstance, functionId: number, userId: number): Promise<FunctionInstance> => {
    const response = await API.get(`/api/function-instances/close/${functionId}?userId=${userId}`);
    return response.data;
}

export const fetchFile = async (filePath: string): Promise<Blob> => {
    const response = await API.get(`/api/function-instances/get-files?filePath=${filePath}`, {
        responseType: 'blob'
    });
    console.log("Fetched File Data:", response.data);
    return new Blob([response.data]);
}

export const updateFunction = async (fn: FunctionInstance, userId: number): Promise<FunctionInstance> => {
    const response = await API.put(`/api/function-instances/${fn.id}?userId=${userId}`, fn);
    return response.data;
}

export const uploadFiles = async (fn: FunctionInstance, files: File[]): Promise<boolean> => {
    console.log("uploading fn files:", files)
    if (!files) {
        throw Error("Unable to upload file(s)");
    }
    const formData = new FormData();
    // Append the column data as a JSON string
    formData.append('function', new Blob([JSON.stringify(fn)], { type: 'application/json' }));
    // Append each file to the FormData object
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }
    console.log("goinh to api");
    // Use axios or another method to send the form data
    const response = await API.post(`/api/function-instances/upload-files`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    console.log("response.data:", response.data);

    return response.data;
}