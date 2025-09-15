import { setAuthToken } from "@/api/apiClient";
import { AUTH_STORAGE_KEY } from "@/constants/auth";

export const saveAuthToken = (token: string) => {
    localStorage.setItem(AUTH_STORAGE_KEY, token);
    setAuthToken(token);
};

export const getErrorMessage = (error: any) => {
    return error.response?.data.message instanceof Array
        ? error.response.data.message[0]
        : error.response?.data.message;
};
