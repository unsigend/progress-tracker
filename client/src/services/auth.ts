// ⚠️ DEPRECATED: This file is deprecated
// Use /services/authWithHooks.ts instead
// This version uses direct localStorage calls which is not recommended
// The new version properly integrates with React hooks

// Auth-related services - queries and mutations

// import dependencies
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import api
import apiClient, { setAuthToken, removeAuthToken } from "@/api/apiClient";

// import query keys
import { queryKeys } from "@/services/queryKeys";

// import types
import type {
    LoginDto,
    CreateUserDto,
    GithubAuthDto,
    GoogleAuthDto,
    AuthResponseDto,
} from "@/api/api";

// import utils
import { saveAuthToken, getErrorMessage } from "@/utils/auth";
import type { AxiosResponse } from "axios";

// ============= QUERIES =============

/**
 * useAuthMe hook to get the current user
 * @returns data, isLoading, isError
 */
export const useAuthMe = () => {
    return useQuery({
        queryKey: queryKeys.auth.me(),
        queryFn: () => apiClient.api.authControllerMe(),
        select: (data) => data.data,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
};

/**
 * useEmailCheck hook to check if email exists
 * @param email - The email to check
 * @returns data, isLoading, isError
 */
export const useEmailCheck = (email: string) => {
    return useQuery({
        queryKey: queryKeys.auth.emailCheck(email),
        queryFn: () => apiClient.api.authControllerEmailCheck({ email }),
        select: (data) => data.data,
        enabled: !!email && email.includes("@"),
        staleTime: 30 * 1000,
    });
};

// ============= MUTATIONS =============

/**
 * useLoginMutation hook for user login
 * @returns mutate, isPending, isError, error
 */
export const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: LoginDto) =>
            apiClient.api.authControllerLogin(credentials),
        onSuccess: (response: AxiosResponse<AuthResponseDto>) => {
            const token = response.data.access_token;
            saveAuthToken(token);
            setAuthToken(token);

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
 * @returns mutate, isPending, isError, error
 */
export const useRegisterMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userData: CreateUserDto) =>
            apiClient.api.authControllerRegister(userData),
        onSuccess: (response) => {
            const token = response.data.access_token;
            saveAuthToken(token);
            setAuthToken(token);

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
 * @returns mutate, isPending, isError, error
 */
export const useGithubAuthMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (authData: GithubAuthDto) =>
            apiClient.api.authControllerGithubAuth(authData),
        onSuccess: (response) => {
            const token = response.data.access_token;
            saveAuthToken(token);
            setAuthToken(token);

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
 * @returns mutate, isPending, isError, error
 */
export const useGoogleAuthMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (authData: GoogleAuthDto) =>
            apiClient.api.authControllerGoogleAuth(authData),
        onSuccess: (response) => {
            const token = response.data.access_token;
            saveAuthToken(token);
            setAuthToken(token);

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
 * @returns mutate, isPending, isError, error
 */
export const useLogoutMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            // Clear token from storage and API client
            localStorage.removeItem("jwt-token");
            removeAuthToken();
        },
        onSuccess: () => {
            // Clear all cached data
            queryClient.clear();
        },
    });
};
