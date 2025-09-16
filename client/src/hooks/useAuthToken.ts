// Auth token management hook using useLocalStorage

// import hooks
import { useLocalStorage } from "./useLocalStorage";

// import constants
import { AUTH_STORAGE_KEY } from "@/constants/auth";

// import api client functions
import { setAuthToken as setApiAuthToken, removeAuthToken as removeApiAuthToken } from "@/api/apiClient";

// import effect hook
import { useEffect } from "react";

/**
 * Custom hook for managing authentication token
 * Uses useLocalStorage for consistent state management
 */
export const useAuthToken = () => {
    const [token, setTokenState, removeTokenState] = useLocalStorage<string | null>(
        AUTH_STORAGE_KEY,
        null
    );

    // Sync token with API client whenever it changes
    useEffect(() => {
        if (token) {
            setApiAuthToken(token);
        } else {
            removeApiAuthToken();
        }
    }, [token]);

    /**
     * Save auth token to localStorage and update API client
     * @param newToken - The JWT token to save
     */
    const saveToken = (newToken: string) => {
        setTokenState(newToken);
        // Effect will handle API client update
    };

    /**
     * Remove auth token from localStorage and API client
     */
    const removeToken = () => {
        removeTokenState();
        // Effect will handle API client cleanup
    };

    /**
     * Check if user is authenticated (has valid token)
     * @returns boolean indicating if token exists
     */
    const isAuthenticated = !!token;

    return {
        token,
        saveToken,
        removeToken,
        isAuthenticated,
    };
};

export default useAuthToken;