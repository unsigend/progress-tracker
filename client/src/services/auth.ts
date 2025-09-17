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
import errorUtils from "@/utils/error";
import validationUtils from "@/utils/validation";

/**
 * useAuthMe hook to get the current user
 * @returns data, isLoading, isError
 */
export const useAuthMe = () => {
    const { token } = useAuthToken();

    return useQuery({
        queryKey: queryKeys.auth.me(),
        queryFn: () => apiClient.api.authControllerMe(),
        select: (data) => data.data,
        retry: false,
        staleTime: 5 * 60 * 1000,
        enabled: !!token,
    });
};

/**
 * useEmailCheck hook to check if email exists
 * @param email - the email to check
 * @returns data, isLoading, isError
 */
export const useEmailCheck = (email: string) => {
    return useQuery({
        queryKey: queryKeys.auth.emailCheck(email),
        queryFn: () => apiClient.api.authControllerEmailCheck({ email }),
        select: (data) => data.data,
        enabled: !!email && validationUtils.email(email),
    });
};

/**
 * useLoginMutation hook for user login
 * @returns data, isLoading, isError
 */
export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    const { saveToken } = useAuthToken();

    return useMutation({
        mutationFn: (credentials: LoginDto) =>
            apiClient.api.authControllerLogin(credentials),
        onSuccess: (response) => {
            // get token
            const token = response.data.access_token;

            // Save token using hook
            saveToken(token);

            // Invalidate auth queries to refetch user data
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
        },
        onError: (error) => {
            console.error(
                "Login failed:",
                errorUtils.extractErrorMessage(error)
            );
        },
    });
};

/**
 * useRegisterMutation hook for user registration
 * @returns data, isLoading, isError
 */
export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    const { saveToken } = useAuthToken();

    return useMutation({
        mutationFn: (userData: CreateUserDto) =>
            apiClient.api.authControllerRegister(userData),
        onSuccess: (response) => {
            // get token
            const token = response.data.access_token;

            // Save token using hook
            saveToken(token);

            // Invalidate auth queries to refetch user data
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
        },
        onError: (error) => {
            console.error(
                "Registration failed:",
                errorUtils.extractErrorMessage(error)
            );
        },
    });
};

/**
 * useGithubAuthMutation hook for GitHub OAuth
 * @returns data, isLoading, isError
 */
export const useGithubAuthMutation = () => {
    const queryClient = useQueryClient();
    const { saveToken } = useAuthToken();

    return useMutation({
        mutationFn: (code: GithubAuthDto) =>
            apiClient.api.authControllerGithubAuth(code),
        onSuccess: (response) => {
            // get token
            const token = response.data.access_token;

            // Save token using hook
            saveToken(token);

            // Invalidate auth queries to refetch user data
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
        },
        onError: (error) => {
            console.error(
                "GitHub auth failed:",
                errorUtils.extractErrorMessage(error)
            );
        },
    });
};

/**
 * useGoogleAuthMutation hook for Google OAuth
 * @returns data, isLoading, isError
 */
export const useGoogleAuthMutation = () => {
    const queryClient = useQueryClient();
    const { saveToken } = useAuthToken();

    return useMutation({
        mutationFn: (code: GoogleAuthDto) =>
            apiClient.api.authControllerGoogleAuth(code),
        onSuccess: (response) => {
            // get token
            const token = response.data.access_token;

            // Save token using hook
            saveToken(token);

            // Invalidate auth queries to refetch user data
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
        },
        onError: (error) => {
            console.error(
                "Google auth failed:",
                errorUtils.extractErrorMessage(error)
            );
        },
    });
};

/**
 * useLogoutMutation hook for user logout
 * @returns data, isLoading, isError
 */
export const useLogoutMutation = () => {
    const queryClient = useQueryClient();
    const { removeToken } = useAuthToken();

    return useMutation({
        mutationFn: async () => {
            // Just a placeholder
            return Promise.resolve();
        },
        onSuccess: () => {
            // Remove token using hook
            removeToken();

            // Clear all cached data
            queryClient.clear();
        },
    });
};
