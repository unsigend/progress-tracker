// import api instance
import { Api } from "@/api/api";

// import global config
import globalConfig from "@/data/global";

const apiClient = new Api({
    baseURL: globalConfig.apiRoot,
});

/**
 * Set the auth token
 * @param token - the auth token
 * @returns void
 */
export const setAuthToken = (token: string) => {
    apiClient.instance.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${token}`;
};

/**
 * Remove the auth token
 * @returns void
 */
export const removeAuthToken = () => {
    delete apiClient.instance.defaults.headers.common["Authorization"];
};

export default apiClient;
