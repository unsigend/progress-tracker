/* eslint-disable @typescript-eslint/no-explicit-any */

// import dependencies
import type { AxiosError } from "axios";

const errorUtils = {
    /**
     * Extract last error message from API response (AxiosError)
     * @param error - The error object from API request
     * @returns string - The extracted error message
     */
    extractErrorMessage: (error: any | AxiosError): string => {
        if (error?.response?.data?.message) {
            const message = error.response.data.message;
            return Array.isArray(message)
                ? message[message.length - 1]
                : message;
        }

        return error?.message || "An unexpected error occurred";
    },
};

export default errorUtils;
