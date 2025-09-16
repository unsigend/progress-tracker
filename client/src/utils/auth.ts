/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Extract error message from API response
 * Handles both single messages and array of messages
 * @param error - The error object from API request
 * @returns string - The extracted error message
 */
export const getErrorMessage = (error: any): string => {
    if (error?.response?.data?.message) {
        const message = error.response.data.message;
        return Array.isArray(message) ? message[0] : message;
    }

    return error?.message || "An unexpected error occurred";
};

/**
 * @deprecated Use useAuthToken hook instead
 * This function is kept for backward compatibility
 * Will be removed in future versions
 */
export const saveAuthToken = (token: string) => {
    console.warn("saveAuthToken is deprecated. Use useAuthToken hook instead.");
    localStorage.setItem("jwt-token", token);
};
