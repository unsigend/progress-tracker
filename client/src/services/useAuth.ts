/**
 * Auth service for the auth related queries
 */

// import api client
import apiClient from "@/api/apiClient";

// import types
import type { AuthRequestDto, CreateUserDto, LoginDto } from "@/api/api";

// import key factory
import keyFactory from "@/services/key-factory";

// import react query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Login mutation for logging in a user
 * @Route POST /api/v1/auth/login
 * @returns the login mutation, isPending, isSuccess, isError, error
 */
export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: LoginDto) => apiClient.api.authControllerLogin(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: keyFactory.users.me() });
        },
    });
};

/**
 * Logout mutation for logging out a user
 * @Route POST /api/v1/auth/logout
 * @returns the logout mutation, isPending, isSuccess, isError, error
 */
export const useLogoutMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => apiClient.api.authControllerLogout(),
        onSuccess: () => {
            queryClient.clear();
        },
    });
};

/**
 * Register mutation for registering a user
 * @Route POST /api/v1/auth/register
 * @returns the register mutation, isPending, isSuccess, isError, error
 */
export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateUserDto) =>
            apiClient.api.authControllerRegister(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: keyFactory.users.me() });
        },
    });
};

/**
 * Github auth mutation for authenticating a user with github
 * @Route POST /api/v1/auth/github
 * @returns the github auth mutation, isPending, isSuccess, isError, error
 */
export const useGithubAuthMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: AuthRequestDto) =>
            apiClient.api.authControllerGithubAuth(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: keyFactory.users.me() });
        },
    });
};

/**
 * Google auth mutation for authenticating a user with google
 * @Route POST /api/v1/auth/google
 * @returns the google auth mutation, isPending, isSuccess, isError, error
 */
export const useGoogleAuthMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: AuthRequestDto) =>
            apiClient.api.authControllerGoogleAuth(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: keyFactory.users.me() });
        },
    });
};

/**
 * Email check query for checking if an email is already in use
 * @param email - the email to check
 * @Route GET /api/v1/auth/email-check
 * @returns the email check query
 */
export const useEmailCheckQuery = (email: string) => {
    return useQuery({
        queryKey: keyFactory.auth.emailCheck(email),
        queryFn: () => apiClient.api.authControllerEmailCheck({ email }),
        staleTime: 5 * 60 * 1000,
    });
};
