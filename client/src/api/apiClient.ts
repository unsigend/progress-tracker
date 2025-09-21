/**
 * Api Client for the application
 */

// import api
import { Api } from "@/api/api";

const ApiClient = new Api({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

export default ApiClient;
