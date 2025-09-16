// Auth helper functions that can be used with hooks

/**
 * Initialize authentication on app startup
 * Checks for existing token and sets up API client
 * @param token - The stored JWT token
 * @param setAuthToken - Function to set token in API client
 */
export const initializeAuth = async (
    token: string | null,
    setAuthToken: (token: string) => void,
    apiClient: any
) => {
    if (!token) return null;

    try {
        // Set token in API client
        setAuthToken(token);

        // Verify token is still valid by fetching user data
        const response = await apiClient.api.authControllerMe();
        return response.data;
    } catch (error) {
        // Token is invalid, return null to trigger cleanup
        console.warn("Stored token is invalid:", error);
        return null;
    }
};

/**
 * Handle successful authentication
 * @param token - The JWT token from login/register response
 * @param saveToken - Function to save token (from useAuthToken hook)
 * @param queryClient - TanStack Query client for cache invalidation
 * @param queryKeys - Query keys for cache invalidation
 */
export const handleAuthSuccess = (
    token: string,
    saveToken: (token: string) => void,
    queryClient: any,
    queryKeys: any
) => {
    // Save token (this will automatically update API client via useAuthToken hook)
    saveToken(token);

    // Invalidate auth queries to refetch user data
    queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
};

/**
 * Handle logout
 * @param removeToken - Function to remove token (from useAuthToken hook)
 * @param queryClient - TanStack Query client for cache clearing
 */
export const handleLogout = (
    removeToken: () => void,
    queryClient: any
) => {
    // Remove token (this will automatically update API client via useAuthToken hook)
    removeToken();

    // Clear all cached data
    queryClient.clear();
};