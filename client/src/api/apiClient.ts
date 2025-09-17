// import api instance
import { Api } from "@/api/api";

const apiClientInstance = new Api({
    baseURL: process.env.REACT_APP_API_ROOT,
});

const apiClient = {
    ...apiClientInstance,

    /**
     * Set the auth token
     * @param token - the auth token
     * @returns void
     */
    setAuthToken: (token: string) => {
        apiClientInstance.instance.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;
    },

    /**
     * Remove the auth token
     * @returns void
     */
    removeAuthToken: () => {
        delete apiClientInstance.instance.defaults.headers.common[
            "Authorization"
        ];
    },
};
export default apiClient;
