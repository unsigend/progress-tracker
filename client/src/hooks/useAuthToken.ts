// import hooks
import { useLocalStorage } from "@/hooks/useLocalStorage";

// import api
import apiClient from "@/api/apiClient";

// import effect hook
import { useEffect } from "react";

// import constants
import OAUTH_CONFIG from "@/constants/oauth";

/**
 * useAuthToken hook to manage the auth token
 * @returns {
 *  token: string | null,
 *  saveToken: (newToken: string) => void;
 *  removeToken: () => void;
 *  isAuthenticated: boolean;
 * }
 */
export const useAuthToken = () => {
    const [localStorageToken, setLocalStorageToken, removeLocalStorageToken] =
        useLocalStorage<string | null>(OAUTH_CONFIG.OAUTH_STORAGE_KEY, null);

    // Sync token with API client whenever it changes
    useEffect(() => {
        if (localStorageToken) {
            apiClient.setAuthToken(localStorageToken);
        } else {
            apiClient.removeAuthToken();
        }
    }, [localStorageToken]);

    /**
     * Save auth token to localStorage and update API client
     * @param newToken - The JWT token to save
     * @returns void
     */
    const saveToken = (newToken: string) => {
        setLocalStorageToken(newToken);
    };

    /**
     * Remove auth token from localStorage and API client
     * @returns void
     */
    const removeToken = () => {
        removeLocalStorageToken();
    };

    /**
     * Check if user is authenticated (has valid token)
     * @returns boolean indicating if token exists
     */
    const isAuthenticated = !!localStorageToken;

    return {
        token: localStorageToken,
        saveToken,
        removeToken,
        isAuthenticated,
    };
};

export default useAuthToken;
