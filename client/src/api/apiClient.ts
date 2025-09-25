/**
 * Api Client for the application
 */

// import api
import { Api } from "@/api/api";

// import constants
import AUTH_CONSTANTS from "@/constants/auth";

const ApiClient = new Api({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    securityWorker: async () => {
        // Get token from localStorage on each request
        const token = localStorage.getItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);

        if (token) {
            return {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        }

        return {};
    },
    secure: true,
});

export default ApiClient;
