// Auth services that work with hooks - improved version of auth.ts

// import dependencies
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import api
import apiClient from "@/api/apiClient";

// import query keys
import { queryKeys } from "@/services/queryKeys";

// import hooks
import { useAuthToken } from "@/hooks/useAuthToken";

// import types
import type {
    LoginDto,
    CreateUserDto,
    GithubAuthDto,
    GoogleAuthDto,
} from "@/api/api";

// import utils
import { getErrorMessage } from "@/utils/auth";

// ============= QUERIES =============

/**
 * useAuthMe hook to get the current user
 * Now with automatic token restoration on app start
 */
export const useAuthMe = () => {
    const { token } = useAuthToken();

    return useQuery({
        queryKey: queryKeys.auth.me(),
        queryFn: () => apiClient.api.authControllerMe(),
        select: (data) => data.data,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!token, // Only fetch if we have a token
    });
};

/**
 * useEmailCheck hook to check if email exists
 */
export const useEmailCheck = (email: string) => {
    return useQuery({
        queryKey: queryKeys.auth.emailCheck(email),
        queryFn: () => apiClient.api.authControllerEmailCheck({ email }),
        select: (data) => data.data,
        enabled: !!email && email.includes("@"),
        staleTime: 30 * 1000, // 30 seconds
    });
};

// ============= MUTATIONS =============

/**
 * useLoginMutation hook for user login
 * Uses useAuthToken hook for proper token management
 */
export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    const { saveToken } = useAuthToken();

    return useMutation({
        mutationFn: (credentials: LoginDto) =>
            apiClient.api.authControllerLogin(credentials),
        onSuccess: (response) => {
            const token = response.data.access_token;

            // Save token using hook (will automatically update API client)
            saveToken(token);

            // Invalidate auth queries to refetch user data
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
        },
        onError: (error) => {
            console.error("Login failed:", getErrorMessage(error));
        },
    });
};

/**
 * useRegisterMutation hook for user registration
 */
export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    const { saveToken } = useAuthToken();

    return useMutation({
        mutationFn: (userData: CreateUserDto) =>
            apiClient.api.authControllerRegister(userData),
        onSuccess: (response) => {
            const token = response.data.access_token;

            // Save token using hook
            saveToken(token);

            // Invalidate auth queries to refetch user data
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
        },
        onError: (error) => {
            console.error("Registration failed:", getErrorMessage(error));
        },
    });
};

/**
 * useGithubAuthMutation hook for GitHub OAuth
 */
export const useGithubAuthMutation = () => {
    const queryClient = useQueryClient();
    const { saveToken } = useAuthToken();

    return useMutation({
        mutationFn: (authData: GithubAuthDto) =>
            apiClient.api.authControllerGithubAuth(authData),
        onSuccess: (response) => {
            const token = response.data.access_token;

            // Save token using hook
            saveToken(token);

            // Invalidate auth queries to refetch user data
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
        },
        onError: (error) => {
            console.error("GitHub auth failed:", getErrorMessage(error));
        },
    });
};

/**
 * useGoogleAuthMutation hook for Google OAuth
 */
export const useGoogleAuthMutation = () => {
    const queryClient = useQueryClient();
    const { saveToken } = useAuthToken();

    return useMutation({
        mutationFn: (authData: GoogleAuthDto) =>
            apiClient.api.authControllerGoogleAuth(authData),
        onSuccess: (response) => {
            const token = response.data.access_token;

            // Save token using hook
            saveToken(token);

            // Invalidate auth queries to refetch user data
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
        },
        onError: (error) => {
            console.error("Google auth failed:", getErrorMessage(error));
        },
    });
};

/**
 * useLogoutMutation hook for user logout
 */
export const useLogoutMutation = () => {
    const queryClient = useQueryClient();
    const { removeToken } = useAuthToken();

    return useMutation({
        mutationFn: async () => {
            // Just a placeholder - no API call needed for logout
            return Promise.resolve();
        },
        onSuccess: () => {
            // Remove token using hook (will automatically update API client)
            removeToken();

            // Clear all cached data
            queryClient.clear();
        },
    });
};