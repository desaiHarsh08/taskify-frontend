import DepartmentType from "@/lib/department-type";
import { PageResponse } from "@/lib/page-response";
import RoleType from "@/lib/role-type";
import User from "@/lib/user";
import { API } from "@/utils/api";

type DoLoginParams = {
    email: string;
    password: string;
}
export const doLogin = async ({ email, password }: DoLoginParams): Promise<{ accessToken: string, user: User }> => {
    const response = await API.post('/auth/login', { email, password }, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;
}

export const addNewUser = async (newUser: User): Promise<User> => {
    const response = await API.post('/api/users/add', newUser, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    return response.data;
}

export const fetchUserByEmail = async (email: string) => {
    const response = await API.get(`/api/users/email/${email}`);

    return response.data as User
}

export const fetchUserById = async (userId: number) => {
    const response = await API.get(`/api/users/${userId}`);

    return response.data as User;
}

export const fetchUsersByDepartmentAndRole = async ({ department, role }: { department: DepartmentType, role: RoleType }) => {
    const response = await API.get(`/api/users/filters?department=${department}&role=${role}`);

    return response.data as User[];
}

export const fetchAllUsers = async (page: number) => {
    const response = await API.get(`/api/users?page=${page}`);

    return response.data as PageResponse<User>
}

export const fetchUsersByDepartment = async (department: DepartmentType) => {
    const response = await API.get(`/api/users/department/${department}`);

    return response.data as User[];
}

export const updateUser = async (updatedUser: User) => {
    const response = await API.post(`/api/users/${updatedUser.id}`, updateUser, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response.data as User;
}